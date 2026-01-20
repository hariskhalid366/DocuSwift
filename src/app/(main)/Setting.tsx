import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import SettingHeader from '../../components/Header/ScreenHeader';
import ProfileSection from '../../components/Ui/ProfileSection';
import GoPro from '../../components/Ui/GoPro';
import PreferenceView from '../../components/Ui/PreferenceView';
import Logout from '../../components/Ui/Logout';
import * as LUCIDE from 'lucide-react-native';
import { Storage } from '../../store/Storage';
import { formatFileSize } from '../../utils/helper';
import { useAppTheme } from '../../hooks/useAppTheme';
import ThemeSelector from '../../components/Ui/ThemeSelector';

const Setting = () => {
  const { colors, themeMode } = useAppTheme();
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const handleTap = () => {
    console.log('hhhhh');
  };

  const handleClose = () => {
    setThemeModalVisible(false);
  };

  const Preference = [
    {
      id: 0,
      title: 'Appearance',
      subTitle: themeMode.charAt(0).toUpperCase() + themeMode.slice(1),
      icon: LUCIDE.Moon,
      onPress: () => setThemeModalVisible(true),
      switch: false,
      color: colors.primary,
    },
    {
      id: 1,
      title: 'Default Page Size',
      subTitle: 'A4',
      icon: LUCIDE.Ratio,
      onPress: handleTap,
      switch: false,
      color: colors.primary,
    },
    {
      id: 2,
      title: 'Auto-Save to Cloud',
      subTitle: 'System', // This might need logic too
      icon: LUCIDE.LucideCloudUpload,
      onPress: handleTap,
      switch: true,
      color: colors.primary,
    },
  ];
  const Store = [
    {
      id: 0,
      title: 'Backup & Restore',
      subTitle: '',
      icon: LUCIDE.HardDriveUpload,
      onPress: handleTap,
      color: colors.green,
    },
    {
      id: 1,
      title: 'Clear Cache',
      subTitle: formatFileSize(Storage?.size),
      icon: LUCIDE.BrushCleaningIcon,
      onPress: handleTap,
      color: colors.orange,
    },
  ];
  const Support = [
    {
      id: 0,
      title: 'Help Center',
      subTitle: '',
      icon: LUCIDE.HelpCircle,
      onPress: handleTap,
      color: colors.purple,
    },
    {
      id: 1,
      title: 'Privacy Policy',
      subTitle: '',
      icon: LUCIDE.LockKeyhole,
      onPress: handleTap,
      color: colors.dark,
    },
    {
      id: 2,
      title: 'Terms of Service',
      subTitle: '',
      icon: LUCIDE.FileTextIcon,
      onPress: handleTap,
      color: colors.dark,
    },
  ];

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 55 }}
        style={{ backgroundColor: colors.background }}
      >
        <SettingHeader label={'Settings'} />
        <ProfileSection />
        <GoPro />
        <PreferenceView Tag={'App Preferences'} data={Preference} />
        <PreferenceView Tag={'Data & Storage'} data={Store} />
        <PreferenceView Tag={'Support'} data={Support} />
        <Logout />
      </ScrollView>
      <ThemeSelector visible={themeModalVisible} onClose={handleClose} />
    </>
  );
};

export default Setting;
