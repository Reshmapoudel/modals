// import { Employee } from '@/types'
// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import Image from 'next/image'
// import { EmployeeAPI } from '@/services/employeeService'

// type Props = {
//   employeeId: number
// }
// const UpdateEmployeeForm: React.FC<Props> = ({ employeeId }) => {
//   const [employee, setEmployee] = useState<Employee>()

//   useEffect(() => {
//     const getEmployee = async () => {
//       try {
//         const response = await EmployeeAPI.getEmployee(employeeId)
//         setEmployee(response)
//       } catch (err) {}
//     }
//     getEmployee()
//   }, [employeeId])

//   return (
//     <>
//       <div className="flex">
//         <div className="pl-4 pr-4">
//           <Image
//             src="/images/profile.jpeg"
//             width="150"
//             height="150"
//             className="rounded-full"
//             alt="Employees Profile"
//           ></Image>
//         </div>
//         <div className="flex-auto pl-4 pr-4">
//           <label className="block mb-2 text-sm text-gray-500">Name</label>
//           <input
//             type="text"
//             disabled
//             className="block w-full p-2 pl-4 text-sm border rounded-q text-blueGray-600"
//             value={
//               employee?.user_info.first_name +
//               ' ' +
//               employee?.user_info.last_name
//             }
//           />

//           <label className="block mt-4 mb-2 text-sm text-gray-500">Email</label>
//           <input
//             type="text"
//             disabled
//             className="block w-full p-2 pl-4 text-sm border rounded-q text-blueGray-600"
//             value={employee?.user_info.email}
//           />
//         </div>
//       </div>
//       <div className="pt-3 pb-3 pl-4 pr-4 mt-10 mb-4 border-t border-black-300">
//         <div className="font-normal text-gray-800">Permission</div>
//       </div>
//       <div className="pt-3 pb-3 pl-4 pr-4 mt-10 mb-4 border-t border-black-300">
//         <div className="font-normal text-gray-800">Qualifications</div>
//       </div>
//     </>
//   )
// }
// export default UpdateEmployeeForm
