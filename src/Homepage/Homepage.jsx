import { Button, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import styles from './styles.module.scss';
import { delayTime, leaveEarly, formatVND, working_hours } from './handle';
const format = 'HH:mm';

function MyHomepage() {
    // const { w100 } = styles;

    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // State để lưu dữ liệu từng ngày
    const [schedule, setSchedule] = useState(
        // Nó xuất ra 7 vị trí
        day.map((day) => ({
            day: day,
            morningTimeStart: '08:00',
            morningTimeEnd: '12:00',
            afternoonTimeStart: '13:00',
            afternoonTimeEnd: '17:00'
        }))
    );

    // State lưu thông tin delay_time
    const [delayResult, setDelayResult] = useState({});

    // State lưu thông tin leave_time
    const [leaveResult, setLeaveResult] = useState({});

    // State lưu số giờ làm việc
    const [workingHours, setWorkingHours] = useState(0);

    // Hàm cập nhật dữ liệu
    const handleChange = (index, field, value) => {
        const updatedSchedule = [...schedule];

        updatedSchedule[index][field] = value;
        setSchedule(updatedSchedule);
    };

    const handleSave = () => {
        // Đến trễ
        const result_DelayTime = delayTime(schedule);
        setDelayResult(result_DelayTime);

        // Về sớm
        const result_LeaveTime = leaveEarly(schedule);
        setLeaveResult(result_LeaveTime);

        // Số giờ làm việc
        const result_WorkingHours = working_hours(schedule);
        setWorkingHours(result_WorkingHours);
    };

    const handleClearShift = (index, shift) => {
        const updatedSchedule = [...schedule];
        if (shift === 'morning') {
            updatedSchedule[index].morningTimeStart = '';
            updatedSchedule[index].morningTimeEnd = '';
        } else if (shift === 'afternoon') {
            updatedSchedule[index].afternoonTimeStart = '';
            updatedSchedule[index].afternoonTimeEnd = '';
        }
        setSchedule(updatedSchedule); // Cập nhật lại state
    };

    // Nó sẽ chạy lại khi delayResult
    useEffect(() => {}, [delayResult, leaveResult]);

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
                                            <span className='badge text-bg-success'>Ca 1</span>
                                        </td>
                                        <td>
                                            <span className='badge text-bg-success'>Ca 2</span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.map((day, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{day}</td>
                                                <td>
                                                    <div className='d-flex justify-content-around'>
                                                        {/* Morning Start */}
                                                        <TimePicker
                                                            value={
                                                                schedule[index].morningTimeStart
                                                                    ? dayjs(schedule[index].morningTimeStart, format)
                                                                    : null
                                                            }
                                                            format={format}
                                                            onChange={(value) =>
                                                                handleChange(
                                                                    index,
                                                                    'morningTimeStart',
                                                                    value ? value.format(format) : ''
                                                                )
                                                            }
                                                        />
                                                        <TimePicker
                                                            value={
                                                                schedule[index].morningTimeEnd
                                                                    ? dayjs(schedule[index].morningTimeEnd, format)
                                                                    : null
                                                            }
                                                            format={format}
                                                            onChange={(value) =>
                                                                handleChange(
                                                                    index,
                                                                    'morningTimeEnd',
                                                                    value ? value.format(format) : ''
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            type='primary'
                                                            danger
                                                            size='large'
                                                            onClick={() => handleClearShift(index, 'morning')}
                                                        >
                                                            X
                                                        </Button>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='d-flex justify-content-around'>
                                                        {/* Afternoon Start */}
                                                        <TimePicker
                                                            value={
                                                                schedule[index].afternoonTimeStart
                                                                    ? dayjs(schedule[index].afternoonTimeStart, format)
                                                                    : null
                                                            }
                                                            format={format}
                                                            onChange={(value) =>
                                                                handleChange(
                                                                    index,
                                                                    'afternoonTimeStart',
                                                                    value ? value.format(format) : ''
                                                                )
                                                            }
                                                        />

                                                        {/* Afternoon End */}
                                                        <TimePicker
                                                            value={
                                                                schedule[index].afternoonTimeEnd
                                                                    ? dayjs(schedule[index].afternoonTimeEnd, format)
                                                                    : null
                                                            }
                                                            format={format}
                                                            onChange={(value) =>
                                                                handleChange(
                                                                    index,
                                                                    'afternoonTimeEnd',
                                                                    value ? value.format(format) : ''
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            type='primary'
                                                            danger
                                                            size='large'
                                                            onClick={() => handleClearShift(index, 'afternoon')}
                                                        >
                                                            X
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-primary' onClick={handleSave}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>

                <div className='col-lg-4'>
                    <div className='card mt-4'>
                        <div className='card-header text-center bg-primary text-white'>
                            <h4>Thông Tin</h4>
                        </div>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <h5>Số giờ làm việc:</h5>
                                <p className='fs-5'>{workingHours || 0}</p>
                            </div>
                            <hr />

                            <div className='d-flex justify-content-between'>
                                <h5>Thời gian đi trễ:</h5>
                                <p className='fs-5'>{delayResult.sumTimeLate || 0}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <h5>Số lần đi trễ:</h5>
                                <p className='fs-5'>{delayResult.sumLate || 0}</p>
                            </div>
                            <hr />

                            <div className='d-flex justify-content-between'>
                                <h5>Thời gian về sớm</h5>
                                <p className='fs-5'>{leaveResult.sumLeaveEarly || 0}</p>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <h5>Số lần về sớm</h5>
                                <p className='fs-5'>{leaveResult.sumLeave || 0}</p>
                            </div>
                            <hr />
                            <div className='text-danger mb-3 d-flex justify-content-between'>
                                <h1>Trừ:</h1>
                                <h1>{formatVND(delayResult.sumPenaltyMoney + leaveResult.sumMoneyLeavelEarly || 0)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHomepage;
