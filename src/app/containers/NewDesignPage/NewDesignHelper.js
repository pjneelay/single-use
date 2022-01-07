import connector from "../../../assets/items/connector.png";
import connector2 from "../../../assets/items/connector2.PNG";
import kleenpack_connector from "../../../assets/items/Kleenpack_connector.png";
import tubings from "../../../assets/items/tubings.png";
import bags from "../../../assets/items/bag.png";
import filter from "../../../assets/items/filter.png";
import fittings from "../../../assets/items/fittings.png";
import X_fittings from "../../../assets/items/X_fitting.png";
import Y_fittings from "../../../assets/items/Y_fitting.png";
import straight_fittings from "../../../assets/items/straight_fitting.png";
import reducer_fittings from "../../../assets/items/reducer_fitting.png";
import elbow_fittings from "../../../assets/items/elbow_fitting.png";
import bottles from "../../../assets/items/bottle.png";
import accessories from "../../../assets/items/accessories.png";
import sensor from "../../../assets/items/sensor.png";

export const groupingObject = [
    { displayName: 'Connector', relName:['default_connector_ending','connector'],imageurl: connector, relation: ['tubing'], subMenu: [
      {name: 'default_connector_ending', imgUrl: connector, menuName: 'default_connector_ending'},
      {name: 'connector_ending', imgUrl: connector2, menuName: 'connector_ending'}
    ], status: false 
    },

    {
      displayName: 'Tubing', relName:['tubing'],imageurl: tubings, relation: ['connector_ending', 'x_fitting', 'bag', 'bottle', 'filter', 'accessories_clamp', 'accessories_sensor','double_connetor', 't_fitting', 'y_fitting', 'straight_fitting', 'elbow_fitting', 'straight_reducer_fitting'], subMenu: [ 
      {name: 'tubing', imgUrl: tubings, menuName: 'tubing'}], status: true
    },

    { displayName: 'Fitting', relName:['t_fitting', 'x_fitting', 'y_fitting', 'straight_fitting', 'elbow_fitting', 'straight_reducer_fitting'], relation: ['tubing'], subMenu: [
      {name: 't_fitting', imgUrl: fittings, menuName: 't_fitting'},
      {name: 'x_fitting', imgUrl: X_fittings, menuName: 'x_fitting'},
      {name: 'y_fitting', imgUrl: Y_fittings, menuName: 'y_fitting'},
      {name: 'straight_fitting', imgUrl: straight_fittings, menuName: 'straight_fitting'},
      {name: 'elbow_fitting', imgUrl: elbow_fittings, menuName: 'elbow_fitting'},
      {name: 'straight_reducer_fitting', imgUrl: reducer_fittings, menuName: 'straight_reducer_fitting'}
    ], imageurl: fittings, status: false 
    },

    {displayName: 'Bag', relName: ['bag'], relation: ['tubing'], subMenu: [{menuName: 'bag',imgUrl: bags}], imageurl: bags, status: false },

    { displayName: 'Filter', relName: ['filter'], relation: ['tubing'], subMenu: [{menuName: 'filter',imgUrl: filter}], imageurl: filter, status: false },

    { displayName: 'Bottle', relName: ['bottle'], relation: ['tubing'], subMenu: [{menuName: 'bottle',imgUrl: bottles}], imageurl: bottles, status: false },

    { displayName: 'Accessories', relName:['accessories_sensor', 'double_connetor'],relation: ['tubing'], subMenu: [
      {name: 'accessories_clamp',menuName: 'accessories_clamp', imgUrl: accessories},
      {name: 'accessories_sensor', menuName: 'accessories_sensor',imgUrl: sensor},
      {name: 'kleenpack_connector', menuName: 'double_connetor',imgUrl: kleenpack_connector},
    ], imageurl: accessories, status: false }
  
  ];