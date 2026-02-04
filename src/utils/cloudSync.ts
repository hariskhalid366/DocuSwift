import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Scan } from '../types/TabTypes';
import { DocumentPickerResponse } from '@react-native-documents/picker';

export const syncDataToCloud = async (
  scans: Scan[],
  imports: DocumentPickerResponse[],
  isPremium: boolean,
) => {
  if (!isPremium) return;

  const user = auth().currentUser;
  if (!user) return;

  try {
    const userDocRef = firestore().collection('users').doc(user.uid);

    await userDocRef.set(
      {
        lastSync: firestore.FieldValue.serverTimestamp(),
        scans: scans.map(s => ({
          id: s.id,
          uri: s.uri,
          createdAt: s.createdAt,
        })),
        imports: imports.map(i => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
          size: i.size,
        })),
      },
      { merge: true },
    );

    console.log('Cloud sync successful');
  } catch (error) {
    console.error('Cloud sync failed:', error);
  }
};
