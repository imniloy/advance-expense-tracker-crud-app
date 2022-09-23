import { useMatch, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
    const navigate = useNavigate();
    const match = useMatch("/");

    return (
        <div className="App">
            <div className="header">
                <h1>Expense Tracker</h1>
            </div>

            <div className="main">
                <div className="container">{children}</div>
            </div>

            <div className="footer">
                {
                    match
                        ?
                        <span className="">
                            Track your Expense
                        </span>
                        :
                        <span className="btn" onClick={() => navigate(-1)}>
                            Go back
                        </span>
                }
            </div>
        </div>
    );
}
