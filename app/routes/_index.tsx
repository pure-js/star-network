import type { MetaFunction } from '@remix-run/node';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from '@remix-run/react';
import { ExclamationTriangleIcon, PersonIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import fetch from '~/api/getCharacters';
import { cn } from '@/lib/utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'Star Network' },
    { name: 'description', content: 'Find your Hero!' },
  ];
};

export function Search() {
  const query = 1;
  const { status, error, data, refetch } = useQuery({
    queryKey: ['characters'],
    queryFn: () => fetch(`https://swapi.dev/api/search/?search=${query}`),
    enabled: false,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { body: formData });
    refetch();

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 mx-auto mt-8 mb-4"
    >
      <Input
        className="placeholder:text-slate-300"
        name="searchInput"
        type="search"
        placeholder="Seacrh by name"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

export function CharactersPagination({
  className,
  pages,
  lastPage,
}: {
  className: string;
  pages: Array<{ number: number }>;
  lastPage: number;
}) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('p') ? Number(searchParams.get('p')) : 1;

  return (
    <Pagination className={cn('mt-4 mb-4', className)}>
      <PaginationContent>
        <PaginationItem className={page <= 1 ? 'opacity-40' : ''}>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.map(({ number }) => (
          <PaginationItem key={number}>
            <PaginationLink href="#" isActive={page === number ? true : false}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className={page === lastPage ? 'opacity-40' : ''}>
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

export function AlertDestructive({ msg }: { msg: Error }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{`${msg}`}</AlertDescription>
    </Alert>
  );
}

interface IPerson {
  name: string;
  height: number;
  url: string;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: number;
  gender: string;
}

export function CharacterList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('p') ? Number(searchParams.get('p')) : 1;
  const { status, error, data } = useQuery({
    queryKey: ['characters'],
    queryFn: () => fetch(`https://swapi.dev/api/people/?page=${page}`),
  });
  if (status === 'pending') return <SkeletonCard />;
  if (status === 'error') return <AlertDestructive msg={error} />;
  const itemsPerPage = 10;
  const lastPage = Math.ceil(data.count / itemsPerPage);
  const firstPage = 1;
  const pages = [];
  pages.push({ number: firstPage, link: '1' });
  if (page !== firstPage) {
    pages.push({ number: page, link: '' });
  }
  if (page !== lastPage) {
    pages.push({ number: lastPage, link: '' });
  }
  return (
    <>
      {data.results.map((person: IPerson) => {
        const personUrlParts = person.url.split('/').filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <Card key={personId} className="w-full max-w-[350px] mb-4">
            <CardHeader>
              <CardTitle>
                <PersonIcon className="inline-block mr-2" />
                {person.name}
              </CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
              <p>{person.height}</p>
              <p>{person.mass}</p>
              <p>{person.hair_color}</p>
              <p>{person.skin_color}</p>
              <p>{person.eye_color}</p>
              <p>{person.birth_year}</p>
              <p>{person.gender}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link className="w-full" to={`/characters/${personId}`}>
                  More details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
      <CharactersPagination
        className="mt-auto"
        pages={pages}
        lastPage={lastPage}
      />
    </>
  );
}

export default function Index() {
  return (
    <div className="container mx-auto min-h-lvh flex flex-col">
      <Search />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8">
        Characters
      </h1>
      <CharacterList />
    </div>
  );
}
