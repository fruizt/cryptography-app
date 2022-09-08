import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
        <div ClassName="sidebar">
            <ul>
                <li>
                    <Link to="">Hill</Link>
                </li>
                <li>
                    <Link to="">Vigenere</Link>
                </li>
                <li>
                    <Link to="">Ceasar</Link>
                </li>
            </ul>
        </div>);
};

export default Sidebar