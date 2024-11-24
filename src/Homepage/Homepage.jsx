// import timeLate from './handle';
import { TimePicker } from 'antd';
import day from './contants';
import dayjs from 'dayjs';
import { useState } from 'react';
import { timeLate } from './late';
// import { useState } from 'react';
const format = 'HH:mm';

function MyHomepage() {
    // State để lưu giá trị các TimePicker cho từng ngày
    const [timeValues, setTimeValues] = useState(
        day.map(() => ({
            shift1: ['08:00', '12:00'], // Lưu dưới dạng chuỗi
            shift2: ['13:00', '17:00'] // Lưu dưới dạng chuỗi
        }))
    );

    const [leaveEarly, setLeaveEarly] = useState(
        day.map(() => ({
            shift1: '', // Lưu giá trị về sớm của ca 1
            shift2: '' // Lưu giá trị về sớm của ca 2
        }))
    );

    const handleLeaveEarlyChange = (dayIndex, shift, value) => {
        const updatedLeaveEarly = [...leaveEarly];
        updatedLeaveEarly[dayIndex][shift] = value;
        setLeaveEarly(updatedLeaveEarly);
    };

    console.log(leaveEarly);

    const handleTimeChange = (dayIndex, shift, values) => {
        const updatedTimeValues = [...timeValues];
        updatedTimeValues[dayIndex][shift] = values
            ? values.map((time) => (time ? time.format(format) : ''))
            : []; // Nếu `values` là null, đặt mảng rỗng
        setTimeValues(updatedTimeValues);
    };

    // Hàm in ra giá trị khi nhấn nút
    const logValues = () => {
        console.log(timeValues);
        console.log('Leave Early Values:', leaveEarly);
        // timeLate(timeValues);
        // timeLate1(timeValues);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8'>
                    <div className='card'>
                        <div className='card-header'>
                            <h1>Tính lương nhân viên</h1>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr className='text-center'>
                                        <td></td>
                                        <td>
                                            <span className='badge text-bg-success'>
                                                Ca 1
                                            </span>
                                        </td>
                                        <td>
                                            <span className='badge text-bg-success'>
                                                Ca 2
                                            </span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.map((d, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{d}:</th>
                                                <td className='text-center'>
                                                    <div className='d-flex justify-content-around'>
                                                        <TimePicker.RangePicker
                                                            value={timeValues[
                                                                index
                                                            ].shift1.map(
                                                                (time) =>
                                                                    time
                                                                        ? dayjs(
                                                                              time,
                                                                              format
                                                                          )
                                                                        : null
                                                            )}
                                                            format={format}
                                                            onChange={(
                                                                values
                                                            ) =>
                                                                handleTimeChange(
                                                                    index,
                                                                    'shift1',
                                                                    values
                                                                )
                                                            }
                                                            style={{
                                                                width: '250px'
                                                            }}
                                                        />
                                                        <input
                                                            type='text'
                                                            placeholder='Về sớm'
                                                            className='form-control'
                                                            style={{
                                                                width: '80px'
                                                            }}
                                                            value={
                                                                leaveEarly[
                                                                    index
                                                                ].shift1
                                                            }
                                                            onChange={(e) =>
                                                                handleLeaveEarlyChange(
                                                                    index,
                                                                    'shift1',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className='text-center'>
                                                    <div className='d-flex justify-content-around'>
                                                        <TimePicker.RangePicker
                                                            value={timeValues[
                                                                index
                                                            ].shift2.map(
                                                                (time) =>
                                                                    time
                                                                        ? dayjs(
                                                                              time,
                                                                              format
                                                                          )
                                                                        : null
                                                            )}
                                                            format={format}
                                                            onChange={(
                                                                values
                                                            ) =>
                                                                handleTimeChange(
                                                                    index,
                                                                    'shift2',
                                                                    values
                                                                )
                                                            }
                                                            style={{
                                                                width: '250px'
                                                            }}
                                                        />
                                                        <input
                                                            type='text'
                                                            placeholder='Về sớm'
                                                            className='form-control'
                                                            style={{
                                                                width: '80px'
                                                            }}
                                                            value={
                                                                leaveEarly[
                                                                    index
                                                                ].shift2
                                                            }
                                                            onChange={(e) =>
                                                                handleLeaveEarlyChange(
                                                                    index,
                                                                    'shift2',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='card-footer'>
                            <button
                                onClick={logValues}
                                className='btn btn-primary'
                            >
                                Tính
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHomepage;
