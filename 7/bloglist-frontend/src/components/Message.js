import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert"

const Message = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <Alert variant={notification.variant}style={notification.style}>
      {notification.userAction}
      {notification.content}
    </Alert>
  );
};

export default Message;
