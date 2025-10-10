import React from 'react';
import StoveSVG from './StoveSVG';
import PantrySVG from './PantrySVG';
import RestaurantSVG from './RestaurantSVG';
import Title from '@/components/Title';
import ArrowSVG from './ArrowSVG';

/**
 * Menu component representing the frontend in the restaurant metaphor.
 * Displays a stylized menu with items, symbolizing the user interface.
 *
 * @param {Object} props - Component props
 * @param {number} [props.width=400] - Width of the SVG
 * @param {number} [props.height=300] - Height of the SVG
 * @param {string} [props.className] - Additional CSS classes
 * @returns {TSX.Element} Menu SVG component
 */
const Menu = ({ width = 400, height = 300, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 300"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="50" y="20" width="300" height="260" fill="#FFFFFF" stroke="#000000" strokeWidth="3" rx="5" />
    <rect x="60" y="30" width="280" height="240" fill="#FFF8EF" stroke="#8B4513" strokeWidth="2" rx="3" />

    <text x="200" y="60" fontFamily="serif" fontSize="28" fontWeight="bold" fill="#8B4513" textAnchor="middle">MENU</text>
    <line x1="100" y1="70" x2="300" y2="70" stroke="#8B4513" strokeWidth="2" />

    <text x="80" y="100" fontFamily="serif" fontSize="16" fill="#333333">Appetizers</text>
    <line x1="80" y1="105" x2="160" y2="105" stroke="#D2691E" strokeWidth="1" />
    <text x="90" y="120" fontFamily="sans-serif" fontSize="12" fill="#666666">Bruschetta .............. $8</text>
    <text x="90" y="135" fontFamily="sans-serif" fontSize="12" fill="#666666">Caesar Salad ......... $9</text>

    <text x="80" y="165" fontFamily="serif" fontSize="16" fill="#333333">Main Courses</text>
    <line x1="80" y1="170" x2="180" y2="170" stroke="#D2691E" strokeWidth="1" />
    <text x="90" y="185" fontFamily="sans-serif" fontSize="12" fill="#666666">Pasta Carbonara ... $18</text>
    <text x="90" y="200" fontFamily="sans-serif" fontSize="12" fill="#666666">Grilled Salmon ...... $22</text>
    <text x="90" y="215" fontFamily="sans-serif" fontSize="12" fill="#666666">Ribeye Steak ......... $28</text>

    <text x="80" y="245" fontFamily="serif" fontSize="16" fill="#333333">Desserts</text>
    <line x1="80" y1="250" x2="150" y2="250" stroke="#D2691E" strokeWidth="1" />
    <text x="90" y="265" fontFamily="sans-serif" fontSize="12" fill="#666666">Tiramisu ................. $7</text>
  </svg>
);

/**
 * Main flow diagram component showing the restaurant-to-software metaphor.
 * Displays Menu (Frontend) → Kitchen (Backend) → Pantry (Database) → Building (AWS)
 * with connecting arrows between each stage.
 *
 * @returns {TSX.Element} Complete flow diagram with all components
 */
const RestaurantFlowSVG = () => {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="restaurant-flow-wrapper">
        <div>
          <Title
            text="Menu (Frontend)"
            level={3}
            align="center"
          />
          <Menu height={300} width={340} />
        </div>
        <div style={{ paddingRight: "20px" }}>
          <ArrowSVG className="restaurant-arrow" width={80} height={300} thickness={10} />
        </div>
        <div>
          <Title
            text="Kitchen (Backend)"
            level={3}
            align="center"
          />
          <StoveSVG height={300} width={190} />
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <ArrowSVG className="restaurant-arrow" width={80} height={300} thickness={10} />
        </div>
        <div>
          <Title
            text="Pantry (DB)"
            level={3}
            align="center"
          />
          <PantrySVG height={300} width={190} />
        </div>
        <ArrowSVG className="restaurant-arrow" width={80} height={300} thickness={10} />
        <div>
          <Title
            text="Building (AWS)"
            level={3}
            align="center"
          />
          <RestaurantSVG height={300} width={190} />
        </div>

      </div>
    </div>
  );
};

export default RestaurantFlowSVG;