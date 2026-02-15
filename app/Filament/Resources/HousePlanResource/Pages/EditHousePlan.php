<?php

namespace App\Filament\Resources\HousePlanResource\Pages;

use App\Filament\Resources\HousePlanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHousePlan extends EditRecord
{
    protected static string $resource = HousePlanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
