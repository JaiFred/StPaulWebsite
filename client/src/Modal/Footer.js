import classNames from 'classnames';

const Footer = ({
    onSubmit,
    onCancel,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    theme = 'light',
    className,
    ...otherProps }) => (
    <div className={classNames("modal-buttons-group", className, theme)} {...otherProps}>
        <button className="modal-button" id='submitBtn' type="button" onClick={onSubmit}>{submitLabel}</button>
        <button className="modal-button" type="button" onClick={onCancel}>{cancelLabel}</button>
    </div>
)

export default Footer;
