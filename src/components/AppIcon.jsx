import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { COLORS, FONT_SIZE } from '../global/theme';

const iconsAvailable = {
  ionicons: Ionicons,
  materialicons: MaterialIcons,
}

const AppIcon = ({
    icon="",
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
    iconColor = COLORS.WHITE
  }) => {

  const IconComponent = iconsAvailable[iconOrigin.toLowerCase()];

  return (
    <IconComponent name={icon} size={iconSize} color={iconColor} />
  );
};

export default AppIcon;
