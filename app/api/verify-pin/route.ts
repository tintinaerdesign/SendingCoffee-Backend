import { NextResponse } from 'next/server';
import { CoffeeService } from '@/services/coffee.service';

export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || undefined;

        const data = await CoffeeService.getAll(category);
        return NextResponse.json({ success: true, message: "Successfully verified", data }, { status: 200 });

    } catch (error){
        return NextResponse.json({ success: false, error: "Error Fetching Data" }, { status: 500 });
    }
}

export async function POST(request: Request){
    try{
        const menuLover = await request.json();
        const { name, price, category } = menuLover;
        //Guard Clause
        if(!name || !price || !category){
            return NextResponse.json({ success: false, message: "name, price and category are required"}, { status: 400 });
        }
        const newItem = CoffeeService.create({ name, price: Number(price), category });
        return NextResponse.json({ success: true, message: "Successfully verified", data: newItem }, { status: 201 });
    } catch (error){
        return NextResponse.json({ success: false, error: "Error Adding item" }, { status : 401 });
    }
}