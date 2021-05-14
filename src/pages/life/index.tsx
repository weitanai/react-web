import React, { useMemo, useState } from 'react';

const ChildTest = () => {
  const [test, setTest] = useState(1);
  const handleClick = () => {
    setTest(test + 1);
  };
  console.log('childtest render');
  return <div onClick={handleClick}>Child {test}</div>;
};

type AntestProps = {
  list: number[];
};
const AnTest: React.FC<AntestProps> = ({ list }) => {
  const [test, setTest] = useState(1);
  const handleClick = () => {
    setTest(test + 1);
  };
  const memo = useMemo(() => {
    console.log(' memo rerender');
    return list.map((item, index) => {
      return <div key={index}>{item}</div>;
    });
  }, [list]);
  console.log('antest rerender');
  return <div onClick={handleClick}> antest {memo} </div>;
};

const LifeTest = () => {
  const [test, setTest] = useState(1);
  const handleClick = () => {
    setTest(test + 1);
    setTest(test + 1);
    setTest(test + 1);
  };
  console.log('rerender');
  const a = [1, 2, 3, 4, 5];
  return (
    <div>
      <div onClick={handleClick}> {`add ${test}`} </div>
      <ChildTest />
      <AnTest list={a} />
    </div>
  );
};
export default LifeTest;
