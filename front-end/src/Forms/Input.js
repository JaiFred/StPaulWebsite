export const Input =({label, name, type, id, placeholder, value, onChange, required} ) => <div className="mb-3">
{label && <label for={id} className={'form-label'}>{label}</label>}
<div className="ms-3">
    <input type={type} name={name} className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} required
    autoComplete={name}/>
</div>
</div>