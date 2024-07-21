import { Pencil1Icon } from '@radix-ui/react-icons';
import { Link } from '@remix-run/react';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import fetch from '~/api/getCharacters';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { getIdbyUrl } from '~/lib/utils';
import { AlertDestructive, SkeletonCard } from '~/routes/_index';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
  },
];

export function CharacterTable() {
  const page = 1;
  const characterId = 1;
  const queryClient = useQueryClient();
  const { status, error, data } = useQuery({
    queryKey: ['characters', { characterId }],
    queryFn: () => fetch(`https://swapi.dev/api/people/${characterId}`),
    placeholderData: keepPreviousData,
    // initialData: () => {
    // Use a todo from the 'todos' query as the initial data for this todo query
    // const data = queryClient.getQueryData(['characters', { page }]);
    // console.log('dd', data);
    // return data?.results[characterId].find(
    //   (d) => getIdbyUrl(d.url) === characterId,
    // );
    // },
  });

  if (status === 'pending') return <SkeletonCard />;
  if (status === 'error') return <AlertDestructive msg={error} />;
  console.log('a', data);
  return (
    <Table>
      <TableCaption>A list of your characteristics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>{data?.gender}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Character() {
  return (
    <div className="container mx-auto min-h-lvh flex flex-col">
      <h1>Character</h1>
      <CharacterTable />
      <Link to={`edit`}>
        <Pencil1Icon />
      </Link>
    </div>
  );
}
