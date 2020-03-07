
const FIELD_TYPES = {
  bool: 'SwitchField'
}

export class FormField {
  get TEMPLATE () {
    return /* html */ `
    <ui:fragment>
      <ui:tag tag={fieldType} ui:props={fieldProps} onChange={onChange}/>
    </ui:fragment>`
  }

  onChange ({ value }) {
    const form = this.form
    const field = this.field
    const id = field.id
    form.data = { ...form.data, [id]: value }
    form.change && form.change(form.data)
  }

  get fieldType () {
    const type = this.field.type || 'text'
    return FIELD_TYPES[type] || (String.capitalize(type) + 'Field')
  }

  get fieldProps () {
    const field = this.field
    const form = this.form
    const id = field.id
    const data = form.data || {}
    const value = data[id]
    return {
      ...field,
      error: (form.error && form.error.fields && form.error.fields[id]) || null,
      get disabled () { return field.disabled && field.disabled(this.value, this.data) },
      value: value === undefined ? null : value,
      caption: field.caption || field.name,
      data
    }
  }
}

export class Form {
  get TEMPLATE () {
    return /* html */ `
    <div autocomplete="off" class="form-horizontal">
        <FormField ui:for="field of fields" field={field} form={form}/>
    </div>`
  }

  getForm () {
    return this
  }

  getFields () {
    return this.fields || Object.keys(this.data).map(id => ({ id, caption: id }))
  }
}
