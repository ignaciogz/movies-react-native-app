import React from 'react';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZE } from '../global/theme';

const iconsAvailable = {
  fontawesome: FontAwesome,
  ionicons: Ionicons,
  materialicons: MaterialIcons,
  materialcommunityicons: MaterialCommunityIcons,
}

const AppIcon = ({
    icon="",
    iconColor = COLORS.WHITE,
    iconOrigin = "IonIcons",
    iconSize = FONT_SIZE.ICON,
  }) => {

  const IconComponent = iconsAvailable[iconOrigin.toLowerCase()];

  return (
    <IconComponent name={icon} size={iconSize} color={iconColor} />
  );
};

export default AppIcon;
