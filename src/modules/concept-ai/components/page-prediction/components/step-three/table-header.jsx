import React from 'react';

const headers = [
  {
    id: 1,
    header:() => (<>Need/<br/>Desire</>),
  },
  {
    id: 2,
    header:() => (<>Distinct<br/>Proposition</>),
  },
  {
    id: 3,
    header:() => (<>Advantage</>),
  },
  {
    id: 4,
    header:() => (<>Attention<br/>Catching</>),
  },
  {
    id: 5,
    header:() => (<>Message<br/>Connection</>),
  },
  {
    id: 6,
    header:() => (<>Clear,<br/>Conise Message</>),
  },
  {
    id: 7,
    header:() => (<>Credibility</>),
  },
  {
    id: 8,
    header:() => (<>Acceptable<br/>Costs</>),
  }
];
function TableHeader({id}) {
  return (
    headers.filter(item => item.id === id)[0]?.header()
  );
}

export default TableHeader;