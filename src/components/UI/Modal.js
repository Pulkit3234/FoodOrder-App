import classes from './Modal.module.css';
import ReactDom from 'react-dom';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModelOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlay');

const Modal = (props) => {
	return (
		<>
			{ReactDom.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
			{ReactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portalElement)}
		</>
	);
};

export default Modal;
