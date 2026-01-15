// import React, { useRef, useCallback } from 'react';
// import { Platform, StyleSheet, BackHandler, Alert } from 'react-native';

// import { DocumentView, Config } from '@pdftron/react-native-pdf';

// const DocView = () => {
//   const viewerRef = useRef<any>(null);

//   const onLeadingNavButtonPressed = useCallback(() => {
//     if (Platform.OS === 'ios') {
//       Alert.alert('App', 'onLeadingNavButtonPressed', [{ text: 'OK' }]);
//     } else {
//       BackHandler.exitApp();
//     }
//   }, []);

//   const onDocumentLoaded = useCallback(() => {
//     // viewerRef.current?.importAnnotations(xfdf)
//   }, []);

//   //   const onAnnotationChanged = useCallback(({ action, annotations }:any) => {}, []);

//   //   const onZoomChanged = useCallback(({ zoom }) => {}, []);

//   //   const onExportAnnotationCommand = useCallback(({ action, xfdfCommand }) => {
//   //     console.log(action, xfdfCommand);
//   //   }, []);

//   const setStampImageData = useCallback(() => {
//     return {
//       annotationId: '75911d3a-f1fa-7a4f-8137-5885e3a4c4ae',
//       pageNumber: 1,
//       stampImageDataUrl:
//         'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
//     };
//   }, []);

//   const path =
//     'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf';

//   const myToolbar = {
//     [Config.CustomToolbarKey.Id]: 'myToolbar',
//     [Config.CustomToolbarKey.Name]: 'myToolbar',
//     [Config.CustomToolbarKey.Icon]: Config.ToolbarIcons.FillAndSign,
//     [Config.CustomToolbarKey.Items]: [
//       Config.Tools.annotationCreateArrow,
//       Config.Tools.annotationCreateCallout,
//       Config.Buttons.undo,
//     ],
//   };

//   return (
//     <DocumentView
//       ref={viewerRef}
//       document={path}
//       padStatusBar
//       showLeadingNavButton
//       leadingNavButtonIcon={
//         Platform.OS === 'ios'
//           ? 'ic_close_black_24px.png'
//           : 'ic_arrow_back_white_24dp'
//       }
//       onLeadingNavButtonPressed={onLeadingNavButtonPressed}
//       onDocumentLoaded={onDocumentLoaded}
//       //   onAnnotationChanged={onAnnotationChanged}
//       //   onExportAnnotationCommand={onExportAnnotationCommand}
//       //   onZoomChanged={onZoomChanged}
//       readOnly={false}
//       disabledElements={[Config.Buttons.userBookmarkListButton]}
//       disabledTools={[
//         Config.Tools.annotationCreateLine,
//         Config.Tools.annotationCreateRectangle,
//       ]}
//       fitMode={Config.FitMode.FitPage}
//       layoutMode={Config.LayoutMode.Continuous}
//       setStampImageData={setStampImageData}
//       openOutlineList
//     />
//   );
// };

// export default DocView;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
