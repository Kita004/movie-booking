export const MainPage = ({ children }) => {
    return (
        <div id="main-page">
            <h1>Cinemas</h1>
            <div className="flex-container">{children}</div>
        </div>
    );
};
