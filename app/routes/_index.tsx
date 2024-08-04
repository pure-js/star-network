import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import type { MetaFunction } from '@remix-run/node';
import { Link, useSearchParams } from '@remix-run/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pie, PieChart } from 'recharts';

import fetch from '~/api/getCharacters';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart';
import { Input } from '~/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import { Skeleton } from '~/components/ui/skeleton';
import { cn, getIdbyUrl } from '~/lib/utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'Star Network' },
    { name: 'description', content: 'Find your Hero!' },
  ];
};

export function Search() {
  const query = 1;
  const { status, error, data, refetch } = useQuery({
    queryKey: ['characters', { query }],
    queryFn: () => fetch(`https://swapi.dev/api/people/?search=${query}`),
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
    <>
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

      {data?.results.map((person: ICharacter) => {
        const personUrlParts = person.url.split('/').filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <article key={personId} className="mt-4">
            <h1>{person.name}</h1>
          </article>
        );
      })}
    </>
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

const chartData = [
  { part: 'hair', proportion: 275, fill: 'var(--color-hair)' },
  { part: 'skin', proportion: 200, fill: 'var(--color-skin)' },
  { part: 'eyes', proportion: 187, fill: 'var(--color-eyes)' },
];

export interface ICharacter {
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
    queryKey: ['characters', { page }],
    queryFn: () => fetch(`https://swapi.dev/api/people/?page=${page}`),
    placeholderData: keepPreviousData,
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
      <div className="place-content-center grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {data.results.map(
          ({
            name,
            height,
            mass,
            hair_color: hairColor,
            skin_color: skinColor,
            eye_color: eyeColor,
            url,
            birth_year: birthYear,
            gender,
          }: ICharacter) => {
            const personId = getIdbyUrl(url);
            const chartConfig = {
              hair: {
                label: 'Hairs',
                color: hairColor,
              },
              skin: {
                label: 'Skin',
                color: skinColor,
              },
              eyes: {
                label: 'Eyes',
                color: eyeColor,
              },
            } satisfies ChartConfig;
            return (
              <Card key={personId} className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {/* <PersonIcon className="inline-block mr-2" /> */}
                    {name}
                  </CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="proportion"
                        nameKey="part"
                        innerRadius={60}
                      />
                    </PieChart>
                  </ChartContainer>
                  <p>Card Content</p>
                  <p>{height}</p>
                  <p>{mass}</p>
                  <p>{hairColor}</p>
                  <p>{skinColor}</p>
                  <p>{eyeColor}</p>
                  <p>{birthYear}</p>
                  <p>{gender}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <Link
                      className="self-center"
                      to={`/characters/${personId}`}
                    >
                      More details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          },
        )}
      </div>
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
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8">
        Characters
      </h1>
      <CharacterList />
    </div>
  );
}
