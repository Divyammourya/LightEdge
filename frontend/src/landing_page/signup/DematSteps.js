function DematSteps() {
  return (
    <div
      style={{
        width: "85%",
        margin: "100px auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h2 style={{ fontWeight: "500", marginBottom: "60px", fontSize:"170%" }}>
        Steps to open a demat account with LightEdge
      </h2>

      {/* Layout: Left image + Right steps */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "120px",
        }}
      >
        {/* Left Image */}
        <div>
          <img className="img" src="./media/images/steps-acop.svg" alt="demat steps" style={{ width: "420px", marginLeft:"20%" }} />
        </div>

        {/* Right steps list */}
        <div style={{ textAlign: "left", maxWidth: "400px", marginRight:"14%" }}>
          {/* Step 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "#444",
              }}
            >
              01
            </div>
            <p style={{ fontSize: "18px", margin: "0" }}>
              Enter the requested details
            </p>
          </div>

          {/* Step 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "#444",
              }}
            >
              02
            </div>
            <p style={{ fontSize: "18px", margin: "0" }}>
              Complete e-sign & verification
            </p>
          </div>

          {/* Step 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "#444",
              }}
            >
              03
            </div>
            <p style={{ fontSize: "18px", margin: "0" }}>Start investing!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DematSteps;
