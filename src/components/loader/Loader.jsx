// components/Loader.js
import './Loader.css';
import { SyncLoader } from "react-spinners";

function Loader({ isLoading }) {
  return (
    <div className="loading-spinner">
      <SyncLoader size={20} color="#0d3e94" loading={isLoading} />
    </div>
  );
}

export default Loader;
