<template>
  <div v-if="showCheckAction && visibleActions">
    <slot name="checkAction" />
  </div>
  <div v-else />
  <div class="base-table my-2">
    <div :class="`table-responsive ${extendClass}`">
      <table :class="`table ${tableClass}`">
        <thead>
          <tr>
            <template v-for="(column, index) in columns">
              <th
                v-if="column.renderHeaderType === RENDER_TYPE.slot"
                class="font-semibold"
                :class="`${column.headerClass || ''}`"
                :key="`slot_${index}`"
              >
                <slot :name="column.slotHeaderName" :column="column" />
              </th>
              <th
                v-else-if="column.renderType === RENDER_TYPE.split"
                :key="`split_${index}`"
                class="font-semibold"
                :class="`${column.headerClass || ''}`"
              >
                <tr>
                  <td
                    class="border-t-0 text-gray-300 font-semibold"
                    :colspan="column.splitTitle.length"
                  >
                    {{ column.title }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(title, index) in column.splitTitle"
                    :key="index"
                    :class="[
                      column.titleClass,
                      index !== column.splitTitle.length - 1 &&
                        'border-r-2 border-gray-300',
                    ]"
                  >
                    {{ title }}
                  </td>
                </tr>
              </th>
              <th
                v-else
                :key="`normal_${index}`"
                class="font-semibold"
                :class="[
                  { 'table-header-link': column.sortColumn },
                  `${column.headerClass || ''}`,
                ]"
                v-on="
                  column.sortColumn
                    ? { click: () => changeDirection(column.sortColumn) }
                    : {}
                "
              >
                <span v-html="column.title" />
                <span v-if="column.sortColumn" class="mx-2 w-6 inline-block">
                  <i
                    v-if="sort[column.sortColumn].currentDirection === DOWN"
                    class="fas fa-long-arrow-alt-down text-primary_black"
                  />
                  <i
                    v-else-if="sort[column.sortColumn].currentDirection === UP"
                    class="fas fa-long-arrow-alt-up text-primary_black"
                  />
                  <span v-else class="">
                    <i class="fas fa-long-arrow-alt-down" />
                    <i class="fas fa-long-arrow-alt-up" />
                  </span>
                </span>
              </th>
            </template>

            <!-- Render last column for if table has action -->
            <th v-if="hasAction" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(rowData, indexRow) in data"
            :key="`row${indexRow}`"
            @click="clickRow(rowData)"
            :class="[{ 'deleted-row': getCellData(rowData, deletedField) }]"
          >
            <td
              v-for="(column, indexCol) in columns"
              :key="`row${indexRow}-col${indexCol}`"
              :class="`${column.columnClass || ''}`"
            >
              <template
                v-if="
                  column.renderType === RENDER_TYPE.slot ||
                  column.renderType === RENDER_TYPE.split
                "
              >
                <slot
                  :name="column.slotName"
                  :record="rowData"
                  :column="column"
                />
              </template>
              <div
                v-else-if="column.render"
                v-html="column.render(rowData, column)"
              />
              <div v-else>{{ getCellData(rowData, column.key) }}</div>
            </td>
            <td v-if="hasAction">
              <div
                v-if="isFulfillCondition(getCellData(rowData, conditionField))"
                class="button-group-content text-center cur-p"
              >
                <div
                  v-if="allowRestore && getCellData(rowData, deletedField)"
                  class="btn-action"
                  :data-hover="getActionText(ACTION_TYPE.restore)"
                  :key="ACTION_TYPE.restore"
                  @click.stop="handleAction(ACTION_TYPE.restore, rowData)"
                >
                  <i
                    :class="getActionClass(ACTION_TYPE.restore)"
                    aria-hidden="true"
                  />
                </div>
                <template v-else v-for="type in actions" :key="type">
                  <div
                    v-if="allowShowAction(type, rowData)"
                    class="btn-action"
                    :data-hover="getActionText(type)"
                    @click.stop="handleAction(type, rowData)"
                  >
                    <i
                      :class="getActionClass(type)"
                      v-if="
                        type === ACTION_TYPE.copy ||
                        type === ACTION_TYPE.restore
                      "
                    />
                    <img v-else :src="getActionClass(type)" class="h-8" />
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <template v-if="data.length === 0">
        <slot v-if="hasEmptySlot()" name="empty" />
        <div v-else class="table-empty-text text-center pt-1 pb-3 text-base">
          {{ emptyText }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { DELETE_GRAY_ICON, EDIT_ICON } from '../../constants/image';
import { RENDER_TYPE, DOWN, UP, ACTION_TYPE } from '../../constants/table';
export default {
  name: 'BaseTable',
  props: {
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    onClickRow: { type: Function, default: () => {} },
    tableClass: { type: String, default: '' },
    extendClass: { type: String, default: '' },
    total: { type: Number, default: 0 },
    fromIndex: { type: Number, default: 0 },
    toIndex: { type: Number, default: 0 },
    hasPagination: { type: Boolean, default: false },
    actions: { type: Array, default: () => [] },
    deletedField: { type: String, default: '' },
    emptyText: { type: String, default: 'Data empty' },
    allowRestore: { type: Boolean, default: false },
    visibleActions: { type: Boolean, default: false },
    showCheckAction: { type: Boolean, default: false },
    showActionFunctions: { type: Object, default: () => ({}) },
    isHasActionCondition: { type: Boolean, default: false },
    conditionField: { type: String, default: '' },
  },
  emits: [...Object.values(ACTION_TYPE)],
  created() {
    this.RENDER_TYPE = RENDER_TYPE;
    this.ACTION_TYPE = ACTION_TYPE;
    this.UP = UP;
    this.DOWN = DOWN;
  },
  data() {
    return {
      sort: this.initSort(),
    };
  },
  computed: {
    hasAction() {
      return this.actions.length > 0;
    },
  },
  methods: {
    initSort() {
      let sort = {};
      this.columns.forEach((column) => {
        if (column.sortColumn) {
          sort[column.sortColumn] = {
            currentDirection: null,
            defaultDirection: DOWN,
          };
        }
      });
      return sort;
    },
    changeDirection(fieldName) {
      let currentSort = this.sort[fieldName];
      // Set other fields to null
      Object.keys(this.sort).forEach((key) => {
        if (key !== fieldName) {
          this.sort[key].currentDirection = null;
        }
      });
      // Set new direction
      if (currentSort.currentDirection === UP) {
        currentSort.currentDirection = DOWN;
      } else if (currentSort.currentDirection === DOWN) {
        currentSort.currentDirection = UP;
      } else {
        currentSort.currentDirection = currentSort.defaultDirection;
      }
      this.sort[fieldName] = { ...currentSort };
      this.sort = { ...this.sort };
      const param = { [`${fieldName}`]: currentSort.currentDirection };
      this.$emit('sort', param);
    },
    hasEmptySlot() {
      return !!this.$slots?.empty;
    },
    clickRow(record) {
      this.onClickRow(record);
    },
    getCellData(rowData, key) {
      try {
        if (key.includes('.')) {
          return key.split('.').reduce((acc, cur) => {
            return acc ? acc[cur] : '';
          }, rowData);
        } else {
          return rowData[key];
        }
      } catch (error) {
        console.log(error);
      }
    },
    getActionClass(actionType) {
      switch (actionType) {
        case ACTION_TYPE.delete:
          return DELETE_GRAY_ICON;
        case ACTION_TYPE.restore:
          return 'fas fa-redo';
        case ACTION_TYPE.edit:
          return EDIT_ICON;

        default:
          return '';
      }
    },
    handleAction(type, rowData) {
      this.$emit(type, rowData);
    },
    allowShowAction(type, rowData) {
      let checkFunction = this.showActionFunctions[type];
      if (!checkFunction) return true;
      return checkFunction(rowData);
    },
    getActionText(actionType) {
      switch (actionType) {
        case ACTION_TYPE.delete:
          return 'delete';
        case ACTION_TYPE.detail:
          return 'detail';
        case ACTION_TYPE.edit:
          return 'edit';
        case ACTION_TYPE.restore:
          return 'restore';
        default:
          return '';
      }
    },
    /**
     * @description check is condition fulfilled
     * @param  conditionField field want to check
     */
    isFulfillCondition(conditionField) {
      if (this.isHasActionCondition && !conditionField) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.table td,
.table th,
.table thead th {
  vertical-align: middle !important;
}
</style>
