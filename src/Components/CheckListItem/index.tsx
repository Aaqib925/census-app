import React, { useCallback, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { APP_IMAGES } from '../../assets/images';

interface Task {
  text: string;
  indicatorColor: string;
  inputType: string;
}

interface CheckListItemProps {
  task: Task;
}

const CheckListItem: React.FC<CheckListItemProps> = ({ task }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const checkedClass = 'bg-[#F1FFE5] border-[#68BD27]';
  const unCheckedClass = 'bg-[#fff] border-[#E1E3E5]';

  const handleOnCheckPress = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <div className='flex py-2 items-center gap-x-4'>
      {task.inputType === 'caution' ? (
        <img src={APP_IMAGES.CAUTION_LOGO} alt='caution' className='w-6 h-6' />
      ) : task.inputType === 'disable' ? (
        <img src={APP_IMAGES.DISABLED_LOGO} alt='Disabled' className='w-6 h-6' />
      ) : (
        <button
          onClick={handleOnCheckPress}
          className={` ${checked ? checkedClass : unCheckedClass} w-6 h-6 flex items-center justify-center  border-2 rounded-lg`}
        >
          {checked ? <HiCheck className='text-[#68BD27]' /> : null}
        </button>
      )}

      <div className='flex flex-col justify-center'>
        <h3 className={`text-[16px] leading-5 ${task.inputType === 'caution' ? 'text-[#FF5252]' : 'text-white'}`}>
          {task.text}
        </h3>
        <div className='flex items-center gap-x-2'>
          <div className={`w-3 h-3 rounded-md bg-[${task.indicatorColor}] border-[#000]/20`} />
          <h5 className={`text-xs ${task.inputType === 'caution' ? 'text-[#FF5252]' : 'text-gray-400'} `}>
            (Not started)
          </h5>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CheckListItem);
