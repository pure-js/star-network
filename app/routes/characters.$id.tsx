import { Pencil1Icon } from '@radix-ui/react-icons';
import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from '@remix-run/react';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import fetch from '~/api/getCharacters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
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
import type { ICharacter } from '~/routes/_index';
import { AlertDestructive, SkeletonCard } from '~/routes/_index';

import { ICharacters } from './characters.$id.edit';

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

export function CharacterTable({ data }: { data: ICharacter }) {
  return (
    <Table>
      <TableCaption>A list of your characteristics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="w-[100px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
          </TableRow>
        ))} */}
        {/* <TableRow>
          <TableCell className="font-medium">Name</TableCell>
          <TableCell>{data?.name}</TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell className="font-medium">Height</TableCell>
          <TableCell>{data?.height}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mass</TableCell>
          <TableCell>{data?.mass}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Hair color</TableCell>
          <TableCell>{data?.hair_color}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Skin color</TableCell>
          <TableCell>{data?.skin_color}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Eye color</TableCell>
          <TableCell>{data?.eye_color}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Birth year</TableCell>
          <TableCell>{data?.birth_year}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Gender</TableCell>
          <TableCell>{data?.gender}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default function Character() {
  const page = 1;
  const characterId = 1;
  const queryClient = useQueryClient();
  const { status, error, data } = useQuery({
    queryKey: ['characters', { characterId }],
    queryFn: () => fetch(`https://swapi.dev/api/people/${characterId}`),
    placeholderData: keepPreviousData,
    initialData: () => {
      const data: ICharacters | undefined = queryClient.getQueryData([
        'characters',
        { page },
      ]);
      return data?.results.find(
        (character: ICharacter) => getIdbyUrl(character.url) === characterId,
      );
    },
  });

  // if (status === 'pending')
  // if (status === 'error') return <AlertDestructive msg={error} />;
  switch (status) {
    case 'error':
      return <AlertDestructive msg={error} />;
    case 'pending':
      return <SkeletonCard />;
  }
  return (
    <div className="container mx-auto min-h-lvh flex flex-col">
      <div className="mt-4 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Characters</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-4xl font-extrabold lg:text-5xl">{data?.name}</h1>
      <CharacterTable data={data} />
      <Link to={`edit`}>
        <Pencil1Icon />
      </Link>
    </div>
  );
}
