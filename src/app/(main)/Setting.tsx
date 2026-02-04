import { ScrollView, StyleSheet } from 'react-native';
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
import OptionSelector from '../../components/Ui/OptionSelector';
import { navigate } from '../../navigation/NavigationRef';
import { themes, PDF_PAGE_SIZES } from '../../constant/data';
import { useThemeStore } from '../../store/ThemeStore';
import { useDocuSwift } from '../../store/GlobalState';

const Setting = () => {
  const { colors, themeMode } = useAppTheme();
  const setThemeMode = useThemeStore(state => state.setThemeMode);
  const { pageSize, setPageSize } = useDocuSwift();

  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [pageSizeModalVisible, setPageSizeModalVisible] = useState(false);

  const handleTap = () => {
    console.log('hhhhh');
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
      subTitle: pageSize,
      icon: LUCIDE.Ratio,
      onPress: () => setPageSizeModalVisible(true),
      switch: false,
      color: colors.primary,
    },
    {
      id: 2,
      title: 'Auto-Save to Cloud',
      subTitle: 'System', 
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
      title: 'App Cache',
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
    {
      id: 3,
      title: 'Test Scanner',
      subTitle: '',
      icon: LUCIDE.TestTube,
      onPress: () => navigate('scannerTest'),
      color: colors.primary,
    },
  ];

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
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

      {/* Theme Selector */}
      <OptionSelector
        visible={themeModalVisible}
        onClose={() => setThemeModalVisible(false)}
        title="Choose Theme"
        data={themes}
        selectedValue={themeMode}
        onSelect={setThemeMode}
      />

      {/* Page Size Selector */}
      <OptionSelector
        visible={pageSizeModalVisible}
        onClose={() => setPageSizeModalVisible(false)}
        title="Page Size"
        data={PDF_PAGE_SIZES.map(s => ({ label: s.label, value: s.label }))}
        selectedValue={pageSize}
        onSelect={setPageSize}
      />
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 55 },
});
