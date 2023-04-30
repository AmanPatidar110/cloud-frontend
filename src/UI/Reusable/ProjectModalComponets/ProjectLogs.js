// @flow
import * as React from 'react';

import {
  getDatabase,
  ref,
  onValue,
  onChildAdded,
  query,
  limitToLast,
  get,
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
    const dataRef = ref(db, projectName);

    // loader('loading');
    try {
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // The data exists, do something with it
            const data = snapshot.val();

            setLogs(Object.values(data));
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
      loader();
    }
  }, [projectName]);

  console.log(logs[0]);

  return (
    <>
      {logs
        .reverse()
        .slice(0, 200)
        .map((log, index) => {
          return (
            <div
              key={index}
              style={{
                marginBottom: '0.5rem',
                height: '100%',
                overflow: 'auto',
                borderBottom: '1px dashed grey',
                paddingBottom: '0.2rem',
              }}
            >
              <p
                style={{
                  lineHeight: '16px',
                  fontSize: '0.8rem',
                  margin: '0.2rem 0',
                }}
              >
                <span
                  style={{
                    color: 'grey',
                  }}
                >
                  {new Date(parseFloat(log.timeStamp)).toLocaleString()}:{' '}
                </span>
                <span>[{log.email}]: </span>
              </p>
              <p
                style={{
                  lineHeight: '16px',
                  margin: '0',
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{`${log.message}`}</span>
              </p>
            </div>
          );
        })}
    </>
  );
};
