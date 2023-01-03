import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCause } from '../../../services/causesService';

export const RemoveCause = () => {
    const navigate = useNavigate();
    const { causeId } = useParams();

    deleteCause(causeId)
        .then(() => {
            navigate('/my-causes', { replace: true });
            toast.success('Successfully removed cause!');
        })
        .catch(() => {
            toast.error('Failed deleting');
            navigate('/', { replace: true });
        });


    return null;
}
