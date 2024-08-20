export interface IFields {
    fieldName: string;
}

export default function createFieldsString(fields: IFields[]) {
    const fieldNames: { [key: string]: string } = {};
    fields.forEach((field) => (fieldNames[field.fieldName] = ''));
    return fieldNames;
}
