import React from "react";

interface RandomSizedDivsProps {
  count: number;
}

const RandomSizedDivs: React.FC<RandomSizedDivsProps> = ({ count }) => {
  const getRandomSize = () => {
    const minSize = 100;
    const maxSize = 200;
    return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
  };

  const renderRandomDivs = () => {
    const divs = [];
    for (let i = 0; i < count; i++) {
      const size = getRandomSize();
      const style = {
        width: `${size}px`,
        height: `${size}px`,
        margin: "0px",
      };
      divs.push(<div key={i} style={style} className={getRandomColor()}></div>);
    }
    return divs;
  };

  const getRandomColor = () => {
    const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  return (
    <div
      className="random-squares-container"
      style={{
        display: "grid",
        gap: "0px",
        gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
      }}
    >
      {renderRandomDivs()}
    </div>
  );
};

export default RandomSizedDivs;
