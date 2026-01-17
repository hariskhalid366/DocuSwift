import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import SettingHeader from '../../components/Header/SettingHeader';
import ProfileSection from '../../components/Ui/ProfileSection';
import GoPro from '../../components/Ui/GoPro';
import PreferenceView from '../../components/Ui/PreferenceView';
import Logout from '../../components/Ui/Logout';
import * as LUCIDE from 'lucide-react-native';
import { Storage } from '../../store/Storage';
import { formatFileSize } from '../../utils/helper';
import { colors } from '../../constant/colors';

const Setting = () => {
  const handleTap = () => {
    console.log('hhhhh');
  };

  const Preference = [
    {
      id: 0,
      title: 'Appearence',
      subTitle: 'System',
      icon: LUCIDE.Moon,
      onPress: handleTap,
      switch: false,
      color: colors.primery,
    },
    {
      id: 1,
      title: 'Default Page Size',
      subTitle: 'A4',
      icon: LUCIDE.Ratio,
      onPress: handleTap,
      switch: false,
      color: colors.primery,
    },
    {
      id: 2,
      title: 'Auto-Save to Cloud',
      subTitle: 'System',
      icon: LUCIDE.LucideCloudUpload,
      onPress: handleTap,
      switch: true,
      color: colors.primery,
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
    <ScrollView
      stickyHeaderIndices={[0]}
      contentContainerStyle={{ paddingBottom: 55 }}
    >
      <SettingHeader />
      <ProfileSection />
      <GoPro />
      <PreferenceView Tag={'App Preferences'} data={Preference} />
      <PreferenceView Tag={'Data & Storage'} data={Store} />
      <PreferenceView Tag={'Support'} data={Support} />
      <Logout />
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
