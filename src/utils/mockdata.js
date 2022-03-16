
export const MOCK_STUDENT = {
  id: '2',
  first_name: 'Guillermo',
  last_name: 'Tavidian',
  email: 'guillermo@fing.edu.uy',
  member_since: '2001/03/01',
  role: 'student',
  course: {
    id: '1',
    name: 'PSP 2017'
  },
  programming_language: 'PHP',
};
export const MOCK_STUDENT_2 = {
  id: '3',
  first_name: 'Guillermo',
  last_name: 'Kuster',
  email: 'kuster@fing.edu.uy',
  member_since: '2001/05/01',
  role: 'student',
  course: {
    id: '1',
    name: 'PSP 2017'
  },
  programming_language: 'Rails',
};
export const MOCK_TUTOR = {
  id: '1',
  first_name: 'Silvana',
  last_name: 'Moreno',
  email: 'silvana.moreno@fing.edu.uy',
  member_since: '2017/03/01',
  role: 'professor',
};
export const MOCK_TUTOR_2 = {
  id: '12',
  first_name: 'Betty',
  last_name: 'Apellido',
  email: 'betty@fing.edu.uy',
  member_since: '2017/03/01',
  role: 'professor',
};
export const PSP_PROCESS_00 = {
  id: 1,
  name: 'PSP 0.0',
  has_plan_time: true,
  has_plan_loc: false,
  has_pip: false
};
export const PSP_PROCESS_01 = {
  id: 2,
  name: 'PSP 0.1',
  has_plan_time: true,
  has_plan_loc: true,
  has_pip: true
};

export const MOCK_PROJECT_LIST = [{
  key: '1',
  name: 'Proyecto 1',
  assigned: '2017/03/18',
  deadline: '2017/03/30',
  status: 'working',
  process: PSP_PROCESS_00,
}, {
  key: '2',
  name: 'Proyecto 2',
  assigned: '2001/02/01',
  deadline: '2001/02/15',
  status: 'approved',
  process: PSP_PROCESS_01,
}, {
  key: '3',
  name: 'Proyecto 3',
  assigned: '2001/03/01',
  deadline: '2001/03/15',
  status: 'working',
  process: PSP_PROCESS_01,
}, {
  key: '4',
  name: 'Proyecto 4',
  assigned: '2001/04/01',
  deadline: '2001/04/15',
  status: 'dued',
  process: PSP_PROCESS_01,
}, {
  key: '5',
  name: 'Proyecto 5',
  assigned: '2001/05/01',
  deadline: '2001/05/15',
  status: 'assigned',
  process: PSP_PROCESS_01,
}, {
  key: '6',
  name: 'Proyecto 6',
  assigned: '2001/06/01',
  deadline: '2001/06/15',
  status: 'being_corrected',
  process: PSP_PROCESS_01,
}, {
  key: '7',
  name: 'Proyecto 7',
  assigned: '2001/07/01',
  deadline: '2001/07/15',
  status: 'need_correction',
  process: PSP_PROCESS_01,
}];
export const MOCK_DASHBOARD_ACTIVE_PROJECT = {
  id: '3',
  name: 'Proyecto 3',
};
export const MOCK_DASHBOARD_PROJECTS_LIST = [{
  key: '1',
  name: 'Proyecto 1',
  pending: '0',
  to_assign: '0',
  approved: '4',
  working: '0',
  to_correct: '0',
  deadline: '2017/03/30',
  process: PSP_PROCESS_00,
}, {
  key: '2',
  name: 'Proyecto 2',
  pending: '0',
  to_assign: '0',
  approved: '3',
  working: '1',
  to_correct: '0',
  deadline: '2001/02/15',
  process: PSP_PROCESS_01,
}, {
  key: '3',
  name: 'Proyecto 3',
  pending: '1',
  to_assign: '1',
  approved: '0',
  working: '1',
  to_correct: '1',
  deadline: '2001/03/15',
  process: PSP_PROCESS_01,
}, {
  key: '4',
  name: 'Proyecto 4',
  pending: '4',
  to_assign: '0',
  approved: '0',
  working: '0',
  to_correct: '0',
  deadline: '2001/04/15',
  process: PSP_PROCESS_01,
}, {
  key: '5',
  name: 'Proyecto 5',
  pending: '4',
  to_assign: '0',
  approved: '0',
  working: '0',
  to_correct: '0',
  deadline: '2001/05/15',
  process: PSP_PROCESS_01,
}, {
  key: '6',
  name: 'Proyecto 6',
  pending: '4',
  to_assign: '0',
  approved: '0',
  working: '0',
  to_correct: '0',
  deadline: '2001/06/15',
  process: PSP_PROCESS_01,
}, {
  key: '7',
  name: 'Proyecto 7',
  pending: '4',
  to_assign: '0',
  approved: '0',
  working: '0',
  to_correct: '0',
  deadline: '2001/07/15',
  process: PSP_PROCESS_01,
}];

export const MOCK_DASHBOARD_STUDENTS_LIST = [{
  id: '2',
  first_name: 'Guillermo',
  last_name: 'Tavidian',
  projects: [
    {
      id: 'a1',
      psp_project: {
        id: '1',
        name: 'Proyecto 1',
        deadline: '2017/03/25',
        process: PSP_PROCESS_00,
      },
      status: 'approved',
    }, {
      id: 'a2',
      psp_project: {
        id: '2',
        name: 'Proyecto 2',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'approved',
    }, {
      id: 'a3',
      psp_project: {
        id: '3',
        name: 'Proyecto 3',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'a4',
      psp_project: {
        id: '4',
        name: 'Proyecto 4',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'a5',
      psp_project: {
        id: '5',
        name: 'Proyecto 5',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'a6',
      psp_project: {
        id: '6',
        name: 'Proyecto 6',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'a7',
      psp_project: {
        id: '7',
        name: 'Proyecto 7',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }
  ],
  tutor: MOCK_TUTOR,
}, {
  id: '3',
  first_name: 'Guillermo',
  last_name: 'Kuster',
  projects: [
    {
      id: 'b1',
      psp_project: {
        id: '1',
        name: 'Proyecto 1',
        deadline: '2017/03/25',
        process: PSP_PROCESS_00,
      },
      status: 'approved',
    }, {
      id: 'b2',
      psp_project: {
        id: '2',
        name: 'Proyecto 2',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'dued',
      last_poke: '2018-03-01T00:59:18.854Z',
    }, {
      id: 'b3',
      psp_project: {
        id: '3',
        name: 'Proyecto 3',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'b4',
      psp_project: {
        id: '4',
        name: 'Proyecto 4',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'b5',
      psp_project: {
        id: '5',
        name: 'Proyecto 5',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'b6',
      psp_project: {
        id: '6',
        name: 'Proyecto 6',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'b7',
      psp_project: {
        id: '7',
        name: 'Proyecto 7',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }
  ],
  tutor: MOCK_TUTOR,
}, {
  id: '4',
  first_name: 'John',
  last_name: 'Doe',
  projects: [
    {
      id: 'c1',
      psp_project: {
        id: '1',
        name: 'Proyecto 1',
        deadline: '2017/03/25',
        process: PSP_PROCESS_00,
      },
      status: 'approved',
    }, {
      id: 'c2',
      psp_project: {
        id: '2',
        name: 'Proyecto 2',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'approved',
    }, {
      id: 'c3',
      psp_project: {
        id: '3',
        name: 'Proyecto 3',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'working',
    }, {
      id: 'c4',
      psp_project: {
        id: '4',
        name: 'Proyecto 4',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'c5',
      psp_project: {
        id: '5',
        name: 'Proyecto 5',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'c6',
      psp_project: {
        id: '6',
        name: 'Proyecto 6',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'c7',
      psp_project: {
        id: '7',
        name: 'Proyecto 7',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }
  ],
  tutor: MOCK_TUTOR_2,
}, {
  id: '5',
  first_name: 'Juan',
  last_name: 'Pueblo',
  projects: [
    {
      id: 'd1',
      psp_project: {
        id: '1',
        name: 'Proyecto 1',
        deadline: '2017/03/25',
        process: PSP_PROCESS_00,
      },
      status: 'approved',
    }, {
      id: 'd2',
      psp_project: {
        id: '2',
        name: 'Proyecto 2',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'approved',
    }, {
      id: '3',
      psp_project: {
        id: '3',
        name: 'Proyecto 3',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'being_corrected',
    }, {
      id: 'd4',
      psp_project: {
        id: '4',
        name: 'Proyecto 4',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'd5',
      psp_project: {
        id: '5',
        name: 'Proyecto 5',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'd6',
      psp_project: {
        id: '6',
        name: 'Proyecto 6',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }, {
      id: 'd7',
      psp_project: {
        id: '7',
        name: 'Proyecto 7',
        deadline: '2017/03/25',
        process: PSP_PROCESS_01,
      },
      status: 'not_assigned',
    }
  ],
  tutor: MOCK_TUTOR,
}];

export const MOCK_DASHBOARD_STUDENTS_FOR_PROJECT_LIST = [{
  id: '2',
  first_name: 'Guillermo',
  last_name: 'Tavidian',
  project: {
    id: '3',
    name: 'Project 3',
    status: 'not_assigned',
  },
  tutor: MOCK_TUTOR,
}, {
  id: '3',
  first_name: 'Guillermo',
  last_name: 'Kuster',
  project: {
    id: '3',
    name: 'Project 3',
    status: 'dued',
    last_poke: '2018-03-01T00:59:18.854Z',
  },
  tutor: MOCK_TUTOR,
}, {
  id: '4',
  first_name: 'John',
  last_name: 'Doe',
  project: {
    id: '3',
    name: 'Project 3',
    status: 'working',
  },
  tutor: MOCK_TUTOR_2,
}, {
  id: '5',
  first_name: 'Juan',
  last_name: 'Pueblo',
  project: {
    id: '3',
    name: 'Project 3',
    status: 'being_corrected',
  },
  tutor: MOCK_TUTOR,
}];
export const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_TUTOR,
    read: true
  },
  {
    id: '2',
    type: 'general',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    status: 'assigned',
    person: MOCK_TUTOR,
    read: false
  },
  {
    id: '3',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_TUTOR,
    read: false
  },
  {
    id: '6',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_TUTOR,
    read: true
  },
  {
    id: '9',
    type: 'general',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    status: 'dued',
    person: MOCK_TUTOR,
    read: false
  },
  {
    id: '22',
    type: 'general',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '5',
        name: 'Proyecto 5'
      },
    },
    status: 'approved',
    person: MOCK_TUTOR,
    read: false
  },

];

export const MOCK_NOTIFICATIONS_PROFESSOR = [
  {
    id: '1',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_STUDENT,
    read: true
  },
  {
    id: '3',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT_2,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_STUDENT_2,
    read: false
  },
  {
    id: '6',
    type: 'message',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    person: MOCK_STUDENT,
    read: true
  },
  {
    id: '9',
    type: 'general',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '3',
      student: MOCK_STUDENT,
      psp_project: {
        id: '3',
        name: 'Proyecto 3'
      },
    },
    status: 'dued',
    person: null,
    read: false
  },
  {
    id: '22',
    type: 'general',
    date: '2018-03-01T00:59:18.854Z',
    project: {
      id: '5',
      student: MOCK_STUDENT,
      psp_project: {
        id: '5',
        name: 'Proyecto 5'
      },
    },
    status: 'being_corrected',
    person: MOCK_STUDENT,
    read: false
  },

];

export const MOCK_PROJECT_DETAILS_1 = {
  id: '1',
  psp_project: {
    id: '1',
    name: 'Proyecto 1',
    deadline: '2017/03/25',
    process: PSP_PROCESS_00,
    instructions: 'http://psp.s3.amazon.com/projects/1/letter.pdf',
  },
  language: 'PHP',
  assigned: '2017/03/20',
  messages: [],
  tutor: MOCK_TUTOR,
  timeline: [
    {
      id: '1',
      date: '2017/03/18',
      status: 'assigned',
      version: {
        id: '1_1',
        version: '1'
      },
    },
    {
      id: '2',
      date: '2017/03/18',
      status: 'working',
      version: {
        id: '1_1',
        version: '1'
      },
    },
    //HERE HERE HERE
    {
      id: '3',
      date: '2017/03/25',
      status: 'being_corrected',
      version: {
        id: '1_1',
        version: '1'
      },
    },
    /*
    {
      id: '4',
      date: '2017/03/27',
      status: 'approved',
      version: {
      id: '1_1',
      version: '1',
    }*/
  ]
};

export const MOCK_PROJECT_DETAILS_VERSION_1_1 = {"id":"1_1","version":"1","status":"being_corrected","summary":{"phases":[{"key":"1","metric":"Plan","plan":"","actual":"9","to_date":"9"},{"key":"2","metric":"Design","plan":"","actual":"16","to_date":"16"},{"key":"3","metric":"Code","plan":"","actual":"29","to_date":"29"},{"key":"4","metric":"Compile","plan":"","actual":"10","to_date":"10"},{"key":"5","metric":"Unit Testing","plan":"","actual":"7","to_date":"7"},{"key":"6","metric":"Post Mortem","plan":"","actual":"6","to_date":"6"},{"key":"7","metric":"TOTAL","plan":"50","actual":"77","to_date":"77"}],"defects_injected":[{"key":"1","metric":"Plan","plan":"","actual":"0","to_date":"0"},{"key":"2","metric":"Design","plan":"","actual":"0","to_date":"0"},{"key":"3","metric":"Code","plan":"","actual":"4","to_date":"4"},{"key":"4","metric":"Compile","plan":"","actual":"0","to_date":"0"},{"key":"5","metric":"Unit Testing","plan":"","actual":"0","to_date":"0"},{"key":"6","metric":"Post Mortem","plan":"","actual":"0","to_date":"0"},{"key":"7","metric":"TOTAL","plan":"","actual":"4","to_date":"4"}],"defects_removed":[{"key":"1","metric":"Plan","plan":"","actual":"0","to_date":"0"},{"key":"2","metric":"Design","plan":"","actual":"0","to_date":"0"},{"key":"3","metric":"Code","plan":"","actual":"0","to_date":"0"},{"key":"4","metric":"Compile","plan":"","actual":"4","to_date":"4"},{"key":"5","metric":"Unit Testing","plan":"","actual":"0","to_date":"0"},{"key":"6","metric":"Post Mortem","plan":"","actual":"0","to_date":"24"},{"key":"0","metric":"TOTAL","plan":"","actual":"4","to_date":"4"}],"file":{"id":"1","link":"http://www.google.com","date":"2017-10-03 14:44:22"}},"phases":[{"id":"1","psp_phase":{"id":"1","name":"PLAN","order":"1","first":true,"last":false},"start_date":"2017-03-18T18:49:49.863Z","end_date":"2017-03-18T18:58:51.115Z","int":null,"comments":null,"plan_time":50,"defects":[]},{"id":2,"psp_phase":{"id":"2","name":"DESIGN","order":"1"},"start_date":"2017-03-18T19:06:44.721Z","end_date":"2017-03-18T19:22:52.373Z","int":null,"comments":"bosquejo de clases a implementar","defects":[]},{"id":3,"psp_phase":{"id":"3","name":"CODE","order":"2"},"start_date":"2017-03-18T19:31:09.743Z","end_date":"2017-03-18T20:09:40.216Z","int":10,"comments":"linkedlist, math e interfaz","defects":[]},{"id":4,"psp_phase":{"id":"4","name":"COMPILE","order":"3"},"start_date":"2017-03-18T20:10:55.084Z","end_date":"2017-03-18T20:21:12.063Z","int":null,"comments":"tuve varios errores basicos.","defects":[{"time_discover":"2017-03-18T20:11:00.041Z","time_fixed":"2017-03-18T20:12:00.561Z","phase_injected":{"id":"3","psp_phase":{"id":"3","name":"CODE","order":"2"}},"psp_defect_type":{"id":"2","name":"Syntax"},"id":1,"comment":"errores basicos, 2 puntos y coma, me faltaba un parentesis"},{"time_discover":"2017-03-18T20:12:10.950Z","time_fixed":"2017-03-18T20:13:10.458Z","phase_injected":{"id":"3","psp_phase":{"id":"3","name":"CODE","order":"2"}},"psp_defect_type":{"id":"3","name":"Build, Pacakge"},"id":2,"comment":"faltaban includes"},{"time_discover":"2017-03-18T20:13:20.715Z","time_fixed":"2017-03-18T20:14:30.345Z","phase_injected":{"id":"3","psp_phase":{"id":"3","name":"CODE","order":"2"}},"psp_defect_type":{"id":"4","name":"Assignment"},"id":3,"comment":"una clase se llamaba List y era palabra reservada, la cambie por LinkedList"},{"phase_injected":{"id":"3","psp_phase":{"id":"3","name":"CODE","order":"2"}},"time_discover":"2017-03-18T20:15:50.969Z","psp_defect_type":{"id":"8","name":"Function"},"time_fixed":"2017-03-18T20:19:55.091Z","id":4,"comment":"no me dio error, pero en esta fase me di cuenta que me faltaba un return"}]},{"id":5,"psp_phase":{"id":"5","name":"UNIT TESTING","order":"4"},"start_date":"2017-03-18T21:19:02.082Z","end_date":"2017-03-18T21:30:21.502Z","comments":null,"defects":[],"int":4},{"id":6,"psp_phase":{"id":"6","name":"POST MORTEM","order":"5","last":true},"start_date":"2017-03-18T21:30:47.145Z","end_date":"2017-03-18T21:36:34.518Z","int":null,"comments":null,"defects":[]}]};

export const MOCK_PROJECT_DETAILS_3 = {
  id: '3',
  psp_project: {
    id: '2',
    name: 'Proyecto 3',
    deadline: '2001/02/15',
    process: PSP_PROCESS_01,
    instructions: 'http://psp.s3.amazon.com/projects/2/letter.pdf',
  },
  language: 'PHP',
  assigned: '2001/02/01',
  messages: [
    { id: 1, person: MOCK_STUDENT, date: '2018-03-01T00:59:18.854Z', message: 'Hola, me das una mano??' },
    { id: 2, person: MOCK_TUTOR, date: '2001/02/09 03:00:00', message: 'Obvio, que precisas?' },
    { id: 3, person: MOCK_STUDENT, date: '2001/02/10 00:02:33', message: 'Preciso lorem ipsun sit amet' }
  ],
  tutor: MOCK_TUTOR,
  timeline: [
    {
      id: '1',
      date: '2001/02/01',
      status: 'assigned',
      version: {
        id: '25',
        version: '1'
      },
    },
    {
      id: '2',
      date: '2001/02/03',
      status: 'working',
      version: {
        id: '25',
        version: '1'
      },
    },
    {
      id: '3',
      date: '2001/02/07', //link
      status: 'being_corrected',
      version: {
        id: '25',
        version: '1'
      },
    },
    {
      id: '4',
      date: '2001/02/07',
      status: 'need_correction', //si este es mi ultimo estado, me sale un boton de "empezar nueva version"
      version: {
        id: '25',
        version: '1'
      },
    },
    {
      id: '5',
      date: '2001/02/09',
      status: 'working',
      version: {
        id: '3_2',
        version: '2'
      },
    },
    /*{
      id: '6',
      date: '2001/02/09'),      status: 'being_corrected',
      version: '2',
    },
    {
      id: '7',
      date: '2001/02/10'),      status: 'approved',
      version: '2',
   }*/
  ]
};

export const MOCK_PROJECT_DETAILS_VERSION_3_1 = {
  id: '25',
  version: '1',
  status: 'being_corrected',
  summary: {
    phases: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '100' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '150' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '180' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '10' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '210' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '244' },
      { key: '7', metric: 'TOTAL', plan: '72', actual: '9120', to_date: '244' },
    ],
    locs: [
      { key: '1', metric: 'Base', plan: '', actual: '9135', to_date: '' },
      { key: '2', metric: 'Deleted', plan: '', actual: '9135', to_date: '' },
      { key: '3', metric: 'Modified', plan: '', actual: '9135', to_date: '' },
      { key: '4', metric: 'Added', plan: '', actual: '9135', to_date: '' },
      { key: '5', metric: 'Reused', plan: '', actual: '9135', to_date: '150' },
      { key: '6', metric: 'Added & Modified', plan: '72', actual: '9135', to_date: '150' },
      { key: '7', metric: 'New Reusable', plan: '', actual: '9135', to_date: '150' },
      { key: '8', metric: 'Total', plan: '', actual: '9135', to_date: '150' },
    ],
    defects_injected: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '20' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '20' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '29' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '20' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '210' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '244' },
      { key: '7', metric: 'TOTAL', plan: '', actual: '9120', to_date: '244' },
    ],
    defects_removed: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '20' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '25' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '18' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '1' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '21' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '24' },
      { key: '7', metric: 'TOTAL', plan: '', actual: '9120', to_date: '24' },
    ],
    pip: {
      problem: 'mi problema fue que....',
      proposal: 'considero que para mejorar tendria que...',
      comment: 'no tengo comentarios.',
    },
  },
  file: {
    id: '1',
    link: 'http://www.google.com',
    date: '2017-10-03 14:44:22'
  },
  phases: [{
    id: '1',
    psp_phase: {
      id: '1',
      name: 'PLAN',
      order: '1',
      first: true,
      last: false
    },
    order: '1',
    start_date: '2001/02/09 00:00:30',
    end_date: '2001/02/09 00:17:29',
    int: '0',
    comments: 'lorem ipsum',
    plan_loc_am: '6000',
    plan_loc_b: '600',
    plan_time: '2004',
    defects: [
      {
        id: '1',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '3',
            name: 'CODE',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '5',
          name: 'Other Error',
        },
        time_discover: '2001/02/09 00:00:10',
        time_fixed: '2001/02/09 00:00:59',
        fix_defect: null,
        comment: 'hola que tal?? este fue un grave error.'
      },
      {
        id: '2',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '2',
            name: 'DESIGN',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '2',
          name: 'Parser Error',
        },
        time_discover: '2001/02/06 00:03:34',
        time_fixed: '2001/02/06 00:17:34',
        fix_defect: null,
        comment: 'hola que tal?? este fue un grave error.'
      },
      {
        id: '3',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '3',
            name: 'CODE',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '1',
          name: 'Syntax Error',
        },
        time_discover: '2001/02/09 00:01:00',
        time_fixed: '2018-03-01T00:59:18.854Z',
        fix_defect: '1',
        comment: ''
      }
    ]
  }]
};

export const MOCK_PROJECT_DETAILS_VERSION_3_2 = {
  id: '3_2',
  version: '2',
  status: 'working',
  summary: {
    phases: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '100' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '150' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '180' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '10' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '210' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '244' },
      { key: '7', metric: 'TOTAL', plan: '72', actual: '9120', to_date: '244' },
    ],
    locs: [
      { key: '1', metric: 'Base', plan: '', actual: '9135', to_date: '' },
      { key: '2', metric: 'Deleted', plan: '', actual: '9135', to_date: '' },
      { key: '3', metric: 'Modified', plan: '', actual: '9135', to_date: '' },
      { key: '4', metric: 'Added', plan: '', actual: '9135', to_date: '' },
      { key: '5', metric: 'Reused', plan: '', actual: '9135', to_date: '150' },
      { key: '6', metric: 'Added & Modified', plan: '72', actual: '9135', to_date: '150' },
      { key: '7', metric: 'New Reusable', plan: '', actual: '9135', to_date: '150' },
      { key: '8', metric: 'Total', plan: '', actual: '9135', to_date: '150' },
    ],
    defects_injected: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '20' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '20' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '29' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '20' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '210' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '244' },
      { key: '7', metric: 'TOTAL', plan: '', actual: '9120', to_date: '244' },
    ],
    defects_removed: [
      { key: '1', metric: 'Plan', plan: '', actual: '910', to_date: '20' },
      { key: '2', metric: 'Design', plan: '', actual: '915', to_date: '25' },
      { key: '3', metric: 'Code', plan: '', actual: '918', to_date: '18' },
      { key: '4', metric: 'Compile', plan: '', actual: '91', to_date: '1' },
      { key: '5', metric: 'Unit Testing', plan: '', actual: '921', to_date: '21' },
      { key: '6', metric: 'Post Mortem', plan: '', actual: '924', to_date: '24' },
      { key: '7', metric: 'TOTAL', plan: '', actual: '9120', to_date: '24' },
    ],
    pip: {
      problem: 'mi problema fue que....',
      proposal: 'considero que para mejorar tendria que...',
      comment: 'no tengo comentarios.',
    },
  },
  file: null,
  phases: [{
    id: '1',
    psp_phase: {
      id: '1',
      name: 'PLAN',
      order: '1',
      first: true,
      last: false
    },
    order: '1',
    start_date: '2001/02/09 00:00:30',
    end_date: '2001/02/09 00:17:29',
    int: '0',
    comments: 'lorem ipsum',
    plan_loc_am: '6000',
    plan_loc_b: '600',
    plan_time: '2004',
    defects: [
      {
        id: '1',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '3',
            name: 'CODE',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '5',
          name: 'Other Error',
        },
        time_discover: '2001/02/09 00:00:10',
        time_fixed: '2001/02/09 00:00:59',
        fix_defect: null,
        comment: 'hola que tal?? este fue un grave error.'
      },
      {
        id: '2',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '2',
            name: 'DESIGN',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '2',
          name: 'Parser Error',
        },
        time_discover: '2001/02/06 00:03:34',
        time_fixed: '2001/02/06 00:17:34',
        fix_defect: null,
        comment: 'hola que tal?? este fue un grave error.'
      },
      {
        id: '3',
        phase_injected: {
          id: '1',
          psp_phase: {
            id: '3',
            name: 'CODE',
            first: false,
            last: false
          },
        },
        psp_defect_type: {
          id: '1',
          name: 'Syntax Error',
        },
        time_discover: '2001/02/09 00:01:00',
        time_fixed: '2018-03-01T00:59:18.854Z',
        fix_defect: '1',
        comment: ''
      }
    ]
  }]
};
export const MOCK_DASHBOARD_COURSE_LIST = [
  {
    id: '1',
    name: 'PSP 2015'
  }, {
    id: '2',
    name: 'PSP 2016'
  }, {
    id: '3',
    name: 'PSP 2017'
  }, {
    id: '4',
    name: 'PSP 2018'
  }
];
