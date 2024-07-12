import type { MetaFunction } from '@remix-run/node';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@remix-run/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import fetch from '~/api/getCharacters';

export const meta: MetaFunction = () => {
  return [
    { title: 'Star Network' },
    { name: 'description', content: 'Find your Hero!' },
  ];
};

export function Search() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mx-auto mt-8 mb-4">
      <Input type="search" />
      <Button type="submit">Search</Button>
    </div>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const pages = [
  { isActive: false, number: 1, id: 1 },
  { isActive: true, number: 2, id: 2 },
  { isActive: false, number: 3, id: 3 },
];

export function HeroPagination() {
  return (
    <Pagination className="mt-4 mb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.map(({ number, id, isActive }) => (
          <PaginationItem key={id}>
            <PaginationLink href="#" isActive={isActive}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default function Index() {
  const { status, error, data } = useQuery({
    queryKey: ['characters'],
    queryFn: () => fetch(`https://swapi.dev/api/people/`),
  });
  if (status === 'pending') return <SkeletonCard />;
  if (status === 'error') return <p>Error :(</p>;

  return (
    <div className="container mx-auto">
      <Search />
      <h2 className="h2">Characters</h2>
      {data.results.map((person) => {
        const personUrlParts = person.url.split('/').filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <Card key={personId} className="w-[350px] mb-4">
            <CardHeader>
              <CardTitle>{person.name}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
              <Link to={`/characters/${personId}`}>more details</Link>;
            </CardFooter>
          </Card>
        );
      })}
      <HeroPagination />
    </div>
  );
}
