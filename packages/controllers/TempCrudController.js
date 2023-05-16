import CrudController from './CrudController.js'

class TempCrudController extends CrudController {
  handleAdd () {
    const $index = this.table.list.length
    const row = {
      _index: $index + 1,
      isEditing: true
    }
    this.table.list.push(row)
    this.handleEdit({ $index, row })
  }

  handleDelete ({ $index, row }) {
  	this.table.list.splice($index, 1)
  }

  handleRowEdit ({ row }) {
  	row.isEditing = false
  }

  handleSubmit (params) {
  	this.dialog.visible = false
  }

  handleMultiDelete () {
  	const { list, selection } = this.table
  	this.table.list = list.filter(ele => !selection.includes(ele))
  }
}

export default TempCrudController
