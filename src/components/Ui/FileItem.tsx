import {
  Image,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { memo } from 'react';
import CustomText from '../Global/CustomText';
import { EllipsisVerticalIcon } from 'lucide-react-native';
import { colors } from '../../constant/colors';
import { wp } from '../../constant/Dimensions';
import { FileProps } from '../../types/TabTypes';

const FileItem: React.FC<FileProps> = item => {
  return (
    <Pressable key={item?.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item?.icon} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <CustomText numberOfLines={1} fontWeight="medium" variant="h5">
          {item?.name}
        </CustomText>
        <CustomText fontSize={wp(2.8)} fontWeight="regular">
          {item?.size} • {item?.time}
        </CustomText>
      </View>
      <TouchableOpacity>
        <EllipsisVerticalIcon color={colors.icon} size={wp(6)} />
      </TouchableOpacity>
    </Pressable>
  );
};

export default memo(FileItem);

const styles = StyleSheet.create({
  container: {
    width: wp(94),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: colors.container,
    borderRadius: 15,
    elevation: 4,
    gap: 15,
  },
  imageContainer: {
    backgroundColor: colors.bg2,
    borderRadius: 15,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  textContainer: { flex: 1 },
});
