import { Pencil1Icon } from '@radix-ui/react-icons';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

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
  return (
    <Table>
      <TableCaption>A list of your characteristics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
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
      <Pencil1Icon />
    </div>
  );
}
