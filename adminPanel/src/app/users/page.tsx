
import { columns, User } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      id: "728ed522",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Jane Doe",
      email: "janedoe@gmail.com",
    },
    {
      id: "728ed523",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Mike Galloway",
      email: "mikegalloway@gmail.com",
    },
    {
      id: "728ed524",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Minerva Robinson",
      email: "minerbarobinson@gmail.com",
    },
    {
      id: "728ed525",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Mable Clayton",
      email: "mableclayton@gmail.com",
    },
    {
      id: "728ed526",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Nathan McDaniel",
      email: "nathanmcdaniel@gmail.com",
    },
    {
      id: "728ed527",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Myrtie Lamb",
      email: "myrtielamb@gmail.com",
    },
    {
      id: "728ed528",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Leona Bryant",
      email: "leonabryant@gmail.com",
    },
    {
      id: "728ed529",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Aaron Willis",
      email: "aaronwillis@gmail.com",
    },
    {
      id: "728ed52a",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Joel Keller",
      email: "joelkeller@gmail.com",
    },
    {
      id: "728ed52b",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Daniel Ellis",
      email: "danielellis@gmail.com",
    },
    {
      id: "728ed52c",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Gordon Kennedy",
      email: "gordonkennedy@gmail.com",
    },
    {
      id: "728ed52d",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Emily Hoffman",
      email: "emilyhoffman@gmail.com",
    },
    {
      id: "728ed52e",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Jeffery Garrett",
      email: "jefferygarrett@gmail.com",
    },
    {
      id: "728ed52f",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Ralph Baker",
      email: "ralphbaker@gmail.com",
    },
    {
      id: "728ed52g",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Seth Fields",
      email: "sethfields@gmail.com",
    },
    {
      id: "728ed52h",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Julia Webb",
      email: "juliawebb@gmail.com",
    },
    {
      id: "728ed52i",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Gary Banks",
      email: "garybanks@gmail.com",
    },
    {
      id: "728ed52j",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Flora Chambers",
      email: "florachambers@gmail.com",
    },
    {
      id: "728ed52k",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Steve Hanson",
      email: "stevehanson@gmail.com",
    },
    {
      id: "728ed52l",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Lola Robinson",
      email: "lolarobinson@gmail.com",
    },
    {
      id: "728ed52m",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Ethel Waters",
      email: "ethelwaters@gmail.com",
    },
    {
      id: "728ed52n",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Grace Edwards",
      email: "graceedwards@gmail.com",
    },
    {
      id: "728ed52o",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Sallie Wong",
      email: "salliewong@gmail.com",
    },
    {
      id: "728ed52p",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Bryan Gutierrez",
      email: "bryangutierrez@gmail.com",
    },
    {
      id: "728ed52q",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Erik Rice",
      email: "erikrice@gmail.com",
    },
    {
      id: "728ed52r",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Jordan Atkins",
      email: "jordanatkins@gmail.com",
    },
    {
      id: "728ed52s",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Bill Brewer",
      email: "billbrewer@gmail.com",
    },
    {
      id: "728ed52t",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Edwin Morris",
      email: "edwinmorris@gmail.com",
    },
    {
      id: "728ed52u",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Harold Becker",
      email: "haroldbecker@gmail.com",
    },
    {
      id: "728ed52v",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Hannah Rodriguez",
      email: "hannahrodriguez@gmail.com",
    },
    {
      id: "728ed52w",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Zachary Beck",
      email: "zacharybeck@gmail.com",
    },
    {
      id: "728ed52x",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Frances Potter",
      email: "francespotter@gmail.com",
    },
    {
      id: "728ed52y",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Raymond Murray",
      email: "raymondmurray@gmail.com",
    },
    {
      id: "728ed52z",
      avatar: "/avatar.png",
      status: "Active",
      fullName: "Adam Sherman",
      email: "adamsherman@gmail.com",
    },
    {
      id: "728ed521f",
      avatar: "/avatar.png",
      status: "InActive",
      fullName: "Anne Cruz",
      email: "annecruz@gmail.com",
    },
  ];
};

const UsersPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default UsersPage;
