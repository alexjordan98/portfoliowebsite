/**
 * Arrow component for connecting diagram elements.
 * Creates a simple black SVG arrow with configurable direction and thickness.
 *
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the arrow container
 * @param {number} props.height - Height of the arrow container
 * @param {number} [props.thickness=2] - Thickness of the arrow line in pixels
 * @param {number} [props.rotation=90] - Rotation angle in degrees (0=up, 90=right, 180=down, 270=left)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Arrow SVG component
 */
const ArrowSVG = ({
  width = 200,
  height = 300,
  thickness = 2,
  rotation = 0,
  className = ''
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const arrowSize = 12 + (thickness * 2);
  const arrowheadHeight = 6 + thickness;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
        <line
          x1="0"
          y1={centerY}
          x2={width - arrowSize}
          y2={centerY}
          stroke="#000000"
          strokeWidth={thickness}
        />
        <polygon
          points={`${width - arrowSize},${centerY - arrowheadHeight} ${width},${centerY} ${width - arrowSize},${centerY + arrowheadHeight}`}
          fill="#000000"
        />
      </g>
    </svg>
  );
};

export default ArrowSVG;
