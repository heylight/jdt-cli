import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "@/store/slice/counterSlice";
import { Button, Input } from "antd";
import { useDebounceFn } from "ahooks";

const TestPage = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { run: input2Increase } = useDebounceFn(
    (e) => {
      dispatch(incrementByAmount(+e.target.value));
    },
    { wait: 1000 }
  );
  const goBack = () => {
    history.go(-1);
  };

  const doubleCount = useMemo(() => {
    return count * 2;
  }, [count]);
  return (
    <>
      <div>以下状态由redux管理</div>
      <Button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </Button>
      <span>{count}</span>
      <Button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </Button>
      <br />
      <Input
        placeholder="输入数字以改变count，输入1为+1，输入-1为-1"
        onChange={input2Increase}
      />
      <div>{doubleCount}</div>
      <Button onClick={goBack}>返回</Button>
    </>
  );
};

export default TestPage;
