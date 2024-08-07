import { getDeviceType } from "../utils/utils";

const Header = () => {
  return (
    <>
      <div
        style={{
          height: "10vh",
          color: "white",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>{getDeviceType()}</div>
        <div>2 pending orders</div>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "grey" }}>avg pending:</div>
            <div style={{ marginLeft: "0.5rem" }}>1 min</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "grey" }}>max pending:</div>
            <div style={{ marginLeft: "0.5rem" }}>2 min</div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "grey" }}>orders in the last 15 mins:</div>
            <div style={{ marginLeft: "0.5rem" }}>5</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ color: "grey" }}>orders in the last hour:</div>
            <div style={{ marginLeft: "0.5rem" }}>10</div>
          </div>
        </div>
        <div style={{ color: "#4461E1" }}>Actions</div>
      </div>
    </>
  );
};

export default Header;
