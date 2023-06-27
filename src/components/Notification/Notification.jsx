import PropTypes from 'prop-types';
import css from './Notification.module.css';

export default function Notification({ message }) {
  return <h3 className={css.noFeedback}>{message}</h3>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
