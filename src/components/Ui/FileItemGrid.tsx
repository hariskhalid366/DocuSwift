import {
  Image,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { memo } from 'react';
import CustomText from '../Global/CustomText';
import { EllipsisVerticalIcon, X } from 'lucide-react-native';
import { wp } from '../../constant/Dimensions';
import { formatFileSize } from '../../utils/helper';
import { viewDocument } from '@react-native-documents/viewer';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Toast } from '../Global/ShowToast';

const FileItemGrid: React.FC<any> = ({ item, setRootUri }) => {
  const { colors } = useAppTheme();

  const handlePress = async () => {
    viewDocument({ uri: item?.uri, mimeType: item?.type }).catch(error => {
      console.log(error);
      Toast('source not found');
    });
  };
  return (
    <Pressable
      onPress={handlePress}
      key={item?.name + item?.time}
      style={[styles.container, { backgroundColor: colors.container }]}
    >
      <View style={[styles.imageContainer, { backgroundColor: colors.bg2 }]}>
        <Image
          source={require('../../../assets/icons/pdf.png')}
          style={styles.image}
        />
      </View>
      <CustomText numberOfLines={1} fontWeight="medium" fontSize={wp(3.5)}>
        {item?.name}
      </CustomText>
      <CustomText fontSize={wp(2.8)} fontWeight="regular">
        {formatFileSize(item?.size)} • {item?.time}
      </CustomText>
      <TouchableOpacity style={styles.touchContainer}>
        <EllipsisVerticalIcon color={colors.icon} size={wp(6)} />
      </TouchableOpacity>
    </Pressable>
  );
};

export default memo(FileItemGrid);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: wp(42.5),
    padding: 10,
    borderRadius: 15,
    elevation: 4,
    gap: 15,
    // marginBottom: 10,
  },

  imageContainer: {
    borderRadius: 15,
    padding: 5,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  touchContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
