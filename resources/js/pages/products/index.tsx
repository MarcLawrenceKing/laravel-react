import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlus, Eye, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

interface Product {
    // to get the products from database
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at: string;
    featured_image_url: string;
}
// parameters is to print the list
export default function Index({ ...props }: { products: Product[] }) {
    const { products } = props; // to get props attributes for printing in table
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flash?.success || flash?.error ? true : false); //for alert timeout

    useEffect(() => {
        if (flashMessage) {
            setShowAlert(true); // set showAlert to true when flashMessage is present

            const timer = setTimeout(() => setShowAlert(false), 3000); // 3 seconds before flash closes
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl border p-4">
                {showAlert && flashMessage && (
                    <Alert variant={'default'} className={`${flash?.success ? 'bg-green-800' : flash?.error ? 'bg-red-800' : ''} ml-auto text-white`}>
                        <AlertDescription className="text-white">
                            {flash.success ? 'Success!' : 'Error!'} {''} {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="ml-auto">
                    <Link
                        className="text-md flex cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        as="button"
                        href={route('products.create')}
                    >
                        <CirclePlus className="me-2" /> Add Product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    {' '}
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Price</th>
                                <th className="border p-4">Featured Image</th>
                                <th className="border p-4">Created Date</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-center">{product.id}</td>
                                        <td className="border px-4 py-2 text-center">{product.name}</td>
                                        <td className="border px-4 py-2 text-center">{product.description}</td>
                                        <td className="border px-4 py-2 text-center">{product.price}</td>
                                        <td className="border px-4 py-2 align-middle">
                                            {product.featured_image && (
                                                <img src={product.featured_image_url} alt={product.name} className="h-16 w-16 object-cover" />
                                            )}
                                        </td>
                                        <td className="border px-4 py-2 text-center">{product.created_at}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <Link
                                                as="button"
                                                className="ms-2 cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90"
                                                href={route('products.show', product.id)}
                                            >
                                                <Eye size={18} />{' '}
                                            </Link>
                                            <Link
                                                as="button"
                                                className="ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90"
                                                href={route('products.edit', product.id)}
                                            >
                                                <Pencil size={18} />{' '}
                                            </Link>

                                            <Button
                                                className="ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90"
                                                onClick={() => {
                                                    if (confirm('are you sure you want to delete this product?')) {
                                                        router.delete(route('products.destroy', product.id), { preserveScroll: true });
                                                    }
                                                }}
                                            >
                                                <Trash size={18} />{' '}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-md py-4 text-center font-bold text-red-600">
                                        No Products Found!!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
