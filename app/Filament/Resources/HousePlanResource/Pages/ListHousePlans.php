<?php

namespace App\Filament\Resources\HousePlanResource\Pages;

use App\Filament\Resources\HousePlanResource;
use Filament\Resources\Pages\ListRecords;

class ListHousePlans extends ListRecords
{
    protected static string $resource = HousePlanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
