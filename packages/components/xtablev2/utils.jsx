import { funcs } from '../../utils/index.js'

const { h } = Vue
const { resolveComponent } = funcs

const makeSelectionHeader = (vm) => {
  const all = vm._data.length > 0 && (vm.selected.size === vm._data.length)
  const indeterminate = !all && vm.selected.size > 0

  const onChange = (value) => {
    if (value) {
      vm._data.forEach((_, i) => vm.selected.add(i))
    } else {
      vm.selected.clear()
    }
    const rows = value ? vm._data.slice() : []
    vm.handleSelectionChange(rows)
  }
  return (
    <el-checkbox
      modelValue={all}
      indeterminate={indeterminate}
      onChange={onChange}
    />
  )
}

const makeSelection = (props, vm) => {
  const { rowIndex: $index, rowData: row } = props
  const onChange = () => {
    if (vm.selected.has($index)) {
      vm.selected.delete($index)
    } else {
      vm.selected.add($index)
    }
    const rows = [...vm.selected].map(i => vm._data[i])
    vm.handleSelectionChange(rows)
  }
  return (
    <el-checkbox
      modelValue={vm.selected.has($index)}
      onChange={onChange}
    />
  )
}

const makeIndex = (props, vm) => {
  const { page, limit } = vm._query
  return (page - 1) * limit + props.rowIndex + 1
}

const makeRadio = (props, vm) => {
  const { rowIndex: $index } = props
  return (
    <input
      type="radio"
      value={$index}
      checked={$index === vm.checked}
      onChange={vm.handleCheckedChange}
    />
  )
}

const makeButton = ([props, vm, emit, type, icon, text]) => {
  const { rowIndex: $index, rowData: row } = props
  const onClick = () => {
    vm._emit(emit, { $index, row })
  }
  return (
    <el-button
      type={type}
      {...vm._attrs[emit + '-btn']}
      onClick={onClick}
    >
      <x-icon name={icon} />
      {text}
    </el-button>
  )
}

const makeEditButton = (props, vm) => {
  if (vm.canEdit(props.rowData)) {
    return makeButton([props, vm, 'edit', 'warning', 'edit', '编辑'])
  }
}

const makeRowEditButton = (props, vm) => {
  if (vm.canRowEdit(props.rowData)) {
    return makeButton([props, vm, 'row-edit', 'success', 'collection', '保存'])
  }
}

const makeCancelEditButton = (props, vm) => {
  if (vm.canCancelEdit(props.rowData)) {
    return makeButton([props, vm, 'cancel-edit', 'warning', 'refresh-left', '取消编辑'])
  }
}

const makeDeleteButton = (props, vm) => {
  if (vm.canDelete(props.rowData)) {
    return makeButton([props, vm, 'delete', 'danger', 'DeleteFilled', '删除'])
  }
}

const makeRenderer = (col, vm) => {
  const { _attrs, $slots } = vm
  const { slotRenderers = {} } = _attrs

  if (col.type === 'selection') {
    return (props) => makeSelection(props, vm)
  } else if (col.type === 'index') {
    return (props) => makeIndex(props, vm)
  } else if (col.type === 'radio') {
    return (props) => makeRadio(props, vm)
  } else if (col.slot) {
    if (slotRenderers[col.slot]) {
      return slotRenderers[col.slot]
    } else if ($slots[col.slot]) {
      return (props) => {
        return $slots[col.slot]({
          scope: {
            $index: props.rowIndex,
            row: props.rowData
          },
          column: col
        })
      }
    }
  } else if (vm.slotAll) {
    return (props) => {
      return $slots.all({
        scope: {
          $index: props.rowIndex,
          row: props.rowData
        },
        column: col
      })
    }
  }
  return (props) => {
    const { rowData: row, column } = props
    if (column.comp === 'ElSwitch' || vm.table.isRowEdit && row.isEditing && (column.visible !== false || column.canEdit)) {
      const onInput = (value) => {
        row[column.prop] = value
      }
      const comp = column.comp || 'ElInput'
      return h(resolveComponent(vm, comp), {
        ...column,
        ...column.formAttrs,
        modelValue: row[column.prop],
        onInput,
        disabled: !row.editable || !row.isEditing
      })
    }
    const value = vm.calcValue(props.rowData, col)
    const { showOverflowTooltip } = column.tableAttrs || {}
    if (showOverflowTooltip) {
      return (
        <el-tooltip content={value}>
          {value}
        </el-tooltip>
      )
    }
    return value
  }
}

export const convertColumnsForTableV2 = (columns, vm) => {
  const { _attrs, $slots } = vm

  const cols = columns.map((column, index) => {
    const { tableAttrs = {} } = column
    const col = {
      ...column,
      key: index,
      dataKey: column.prop,
      title: column.label,
      width: column.width || tableAttrs.width ||
            column.minWidth || tableAttrs.minWidth ||
            column.maxWidth || tableAttrs.maxWidth,
      align: column.align || _attrs.tableAlign || 'center'
    }
    if (col.type === 'selection') {
      col.width = col.width || 46
      col.headerCellRenderer = makeSelectionHeader(vm)
    }
    col.cellRenderer = makeRenderer(col, vm)
    return col
  })
  if (!vm.hideOperates) {
    cols.push({
      key: cols.length,
      title: '操作',
      type: 'operates',
      width: vm.operatesWidth || 195,
      align: _attrs.operatesAlign || _attrs.tableAlign || 'center',
      fixed: _attrs.operatesFixed || 'right',
      cellRenderer (props) {
        return (
          <div class="operates">
            {$slots['operates-prefix'] ? $slots['operates-prefix']() : null}
            {makeEditButton(props, vm)}
            {makeRowEditButton(props, vm)}
            {makeCancelEditButton(props, vm)}
            {makeDeleteButton(props, vm)}
            {$slots['operates-suffix'] ? $slots['operates-suffix']() : null}
          </div>
        )
      }
    })
  }
  return cols
}

export default {
  convertColumnsForTableV2
}
