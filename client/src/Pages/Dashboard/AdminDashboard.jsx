import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //************************* */
  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );

  //   const { allPayments, finalMonths, monthlySalesRecord } = useSelector(
  //     (state) => state.razorpay
  //   );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        //************************* */
        data: [allUsersCount, subscribedUsersCount],
        // data: [90, 10],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Fab",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "black",
    datasets: [
      {
        label: "Sales | Month",
        // data: monthlySalesRecord,
        data: [10, 20, 5, 60, 70, 100, 50, 6, 9, 5, 40, 50],
        backgroundColor: ["orange"],
        borderColor: ["black"],
        borderWidth: 2,
      },
    ],
  };

  const myCourse = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are You Sure to Delete the Course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      //************************************* */
      await dispatch(getStatsData());
      //   await dispatch(getPaymentRecord());
    })();
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-2">
        <h1 className="mt-10 text-center text-5xl font-bold text-orange-600">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto mx-10 mt-6 mb-6">
          <div className="flex flex-col items-center gap-5 p-2 shadow-[0_0_10px_black] rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h1 className="text-4xl font-bold">{allUsersCount}</h1>
                  {/* <h1 className="text-4xl font-bold">10</h1> */}
                </div>
                <FaUsers className="text-orange-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h1 className="text-4xl font-bold">{subscribedUsersCount}</h1>
                  {/* <h1 className="text-4xl font-bold">90</h1> */}
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_black] rounded-md">
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>
                  {/* <h1 className="text-4xl font-bold">{allPayments?.count}</h1> */}
                  <h1 className="text-4xl font-bold">50</h1>
                </div>
                <FcSalesPerformance className="text-orange-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  {/* <h1 className="text-4xl font-bold">{allPayments?.count * 499}</h1> */}
                  <h1 className="text-4xl font-bold">5000</h1>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col gap-10 items-center justify-center mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-bold">Courses Overview</h1>

            <button
              onClick={() => navigate("/course/create")}
              className="w-fit btn btn-primary hover:text-white text-lg font-bold rounded px-2 py-1"
            >
              Create New Course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCourse?.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td className="text-center">{idx + 1}</td>
                    {/* <td className="text-center">
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td> */}
                    <td className="text-center">{course?.title}</td>
                    <td className="text-center">{course?.category}</td>
                    <td className="text-center">{course?.createdBy}</td>
                    <td className="text-center">{course?.numbersOfLectures}</td>
                    <td className="max-w-30 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>
                    <td className="flex items-center gap-4">
                      <button
                        className="btn btn-success hover:text-white rounded-lg font-bold text-lg px-4 py-2"
                        onClick={() =>
                          navigate("/course/displaylecture", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        className="btn btn-warning hover:text-white rounded-lg font-bold text-lg px-4 py-2"
                        onClick={() => onCourseDelete(course._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
