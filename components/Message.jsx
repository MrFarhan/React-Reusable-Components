import "../styles/components/Message.scss";
import { useTranslation } from 'react-i18next';


function Message({ message }) {
const { t } = useTranslation();
  return <h1 className="Message">{t(message)}</h1>;
}

export default Message;
