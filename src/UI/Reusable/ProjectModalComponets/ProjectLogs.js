// @flow
import * as React from 'react';

import {
  getDatabase,
  ref,
  onValue,
  onChildAdded,
  query,
  limitToLast,
} from 'firebase/database';
import { firebaseApp } from '../../../utils/firebase';
import useLoader from '../../../helpers/hooks/useLoader';

const db = getDatabase();
let logsRef;
export const ProjectLogs = ({ projectName }) => {
  const [logs, setLogs] = React.useState([]);
  const [finalLogs, setFinalLogs] = React.useState([]);
  const loader = useLoader();
  //   React.useEffect(() => {
  //     logsRef = query(ref(db, `${projectName}`), limitToLast(300));
  //     console.log(logsRef);
  //     return onChildAdded(logsRef, (data) => {
  //       console.log(data.key, data.val());
  //       setLogs((prev) => [...prev, data.val()]);
  //     });
  //   }, []);
  React.useEffect(() => {
    if (!projectName) return;
    const starCountRef = ref(db, projectName);

    // loader('loading');
    try {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        loader();
      });
    } catch (error) {
      console.log(error);
      loader();
    }
  }, [projectName]);
  return <div></div>;
};
